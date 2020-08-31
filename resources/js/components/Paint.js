import React, {useRef, useEffect, useState} from 'react';
import axios from 'axios';


const log = (...x) =>
{
    console.log(...x)
}

export const Paint = ( {setImgState, imgState} ) =>
{
    const min = 2
    const max = 15

    /****************** canvas stuff *********************/

    /****************** hooks *********************/
    const [isDrawing, setIsDrawing] = useState(false)
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [image, setImage] = useState(imgState.imgURL)
    const [width, setWidth] = useState(5)
    const [paintMode, setPaintMode] = useState(true)

    /****************** buttons: toolbar *********************/

    // const colorRef = useRef(null)
    const [color, setColor] = useState('black')
    
    /****************** lifetime fnx *********************/
    useEffect( ()=>{
        //get canvas
      const canvas = canvasRef.current
      canvas.style.backgroundColor = "white"
      const parent = canvas.parentNode
      //style canvas to fit parent div
      canvas.style.height = parent.clientHeight
      canvas.style.width = parent.clientWidth
      canvas.height = parent.clientHeight
      canvas.width = parent.clientWidth

      const backgroundContext = canvas.getContext("2d");
      backgroundContext.fillStyle = "white";
      backgroundContext.fillRect(0, 0, parent.clientWidth, parent.clientHeight);
      

      //start drawing
      const canvasContext = canvas.getContext('2d')
      if(image)
      {
        let img = new Image
        img.src = image
        img.onload = function(){
            canvasContext.drawImage(img, 0, 0)
        };
      }

      canvasContext.lineCap = "round"
      canvasContext.strokeStyle = paintMode ? color : "#fff"
      canvasContext.lineWidth = width
      contextRef.current = canvasContext
    }, [color, width, image, paintMode] )


    /****************** canvas functions *********************/
    const startDrawing = ({nativeEvent}) => {
        const { offsetX, offsetY } = nativeEvent
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }

    const finishDrawing = () => {
        contextRef.current.closePath()
        setIsDrawing(false)
        // log(canvasRef.current.toDataURL())
        setImage(canvasRef.current.toDataURL())
        // log(image.length)
    }


    const draw = ({nativeEvent}) => {
        if(!isDrawing) return
        const {offsetX, offsetY} = nativeEvent
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
    }

    const saveImage = (image) => () =>
    {
        axios.post("/painting", {'imgUrl':image}).then( response =>{
            alert("saved")
            log(response)
            const {imgId, mode, ...rest} = imgState
                setImgState({
                    imgId: null,
                    mode: !mode,
                    ...rest,
                })
        } ).catch( err => {
            if(err.response.status === 403)
                alert("login to save")
            else
                alert(`status ${err.response.status}`)
        } )
    }

    /****************** input color functions *********************/

    const selectColor = (event) =>
    {
        setColor(event.target.value)
    }


    const selectWidth = (event) =>
    {
        setWidth(event.target.value)
        log(width)
    }


    return (
        <div className="canvas-container">
            <div className="toolbar">
                <button type="button" onClick={saveImage(image)} className="yes">Save
                </button>
                <input type="color" value={color} onChange={selectColor}/>
                
                <div className="colorPicker">
                    <input type="range" min={min} max={max} value={width} onChange={selectWidth}/>
                    <div style={{backgroundColor: `${color}`, width: `${width}px`, height: `${width}px`, borderRadius: `${50}%`}}/>
                </div>
                
                <button type="button" onClick={() => setPaintMode(!paintMode)}>
                    { paintMode && <>Erase</> || <>Ink</> }
                </button>
                <button type="button" onClick={() => {
                    setImage("")
                    setPaintMode(true)
                } }>Clear
                </button>
                <button type="button" className="no" onClick={ () =>
                                                    {
                                                        const {mode, ...rest} = imgState
                                                        setImgState({
                                                            mode: !mode,
                                                            ...rest,
                                                        })
                                                    }
                    } >
                    Cancel
                </button>
            </div>
            <div className="canvas">
                <canvas
                    onMouseDown={startDrawing}
                    onMouseUp={finishDrawing}
                    onMouseMove={draw}
                    onMouseLeave={finishDrawing}
                    ref={canvasRef}
                >

                </canvas>
            </div>
        </div>
    );
};