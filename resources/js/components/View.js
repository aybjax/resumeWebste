import React, {useRef, useEffect, useState} from 'react';
import axios from 'axios';


const log = (...x) =>
{
    console.log(...x)
}

export const View = ({setImgState, imgState}) =>
{
    const ratio = 2 //width/height
    const padding = 10 //padding between center and right/left

    // // const contextRef = useRef(null)
    // const [imgs, setImgs] = useState(null)
    const containerRef = useRef(null)
    const [state, setState] = useState({
        centerWidth: 0,
        centerHeight: 0,
        centerStart: 0,
        centerTop: 0,
        underHeight: 0,
        underWidth: 0,
        bottomImgIndex:null,
        imgs: null,
        imgIndex:null,
        imgDB_ID: null,
        imgSize: null,
    })


    const next = () =>{
        if(!imgs) return
        if(state.bottomImgIndex == imgs.length-1) return
        const {bottomImgIndex, ...rest} = state
        const nextImg = bottomImgIndex+1
        setState({
            bottomImgIndex: nextImg,
            ...rest
        })
    }

    const prev = () =>{
        if(!imgs) return
        if(state.bottomImgIndex == 0) return
        const {bottomImgIndex, ...rest} = state
        const nextImg = bottomImgIndex-1
        setState({
            bottomImgIndex: nextImg,
            ...rest
        })
    }

    const renderImg = () =>{
        if(!imgs) return
        const {imgIndex, imgDB_ID, ...rest} = state
        const nextImg = bottomImgIndex
        setState({
            imgIndex: nextImg,
            imgDB_ID: imgs[nextImg].id,
            ...rest
        })
    }

    const deleteImg = () =>{
        const {imgDB_ID, ...rest} = state
        axios.delete(`painting/paint/${imgDB_ID}`)
        .then(resp => {
            alert("deleted")
            const {bottomImgIndex, imgSize, imgs, imgIndex, imgDB_ID, ...rest} = state

            imgs.splice(imgIndex, 1)
            let newSize = imgSize - 1
            let newIndex = imgIndex

            if(newSize < 0)
            {
                newIndex = null
            }else if(newIndex>newSize)
            {
                newIndex = newSize
            }
            
            setState({
                ...rest,
                bottomImgIndex:newIndex,
                imgs: imgs,
                imgIndex:newIndex,
                imgDB_ID: imgs[newIndex] ? imgs[newIndex].id : null,
                imgSize: newIndex != null ? newSize : null,
            })
        })
        .catch(err => {
            alert(err)
            log(err.message)
        })
    }
    
    useEffect(()=>
    {
        const container = containerRef.current
        const containerWidth = container.clientWidth
        const containerHeight = container.clientHeight
        axios.get("/painting/allPaint")
        .then( res => 
            {
                const centerWidth = containerWidth
                const centerHeight = Math.floor(centerWidth / 2)
                const centerStart = Math.floor(containerWidth/3)
                const centerTop = Math.floor((containerHeight - centerHeight) / 2)
                const underHeight = containerHeight - centerHeight
                const underWidth = underHeight * 2

                let index = null
                if(imgState.imgId)
                {
                    index = res.data.findIndex( (img)=>
                    {

                        return imgState.imgId === img.id
                    } )
                }

                let imgIndex;
                const imgSize = res.data.length-1
                if(index !== null)
                {
                    imgIndex = index
                } else
                {
                    try {
                        imgIndex = imgSize
                    }catch
                    {
                       imgIndex = 0
                    }
                }
                setState({
                    centerWidth: centerWidth,
                    centerHeight: centerHeight,
                    centerStart: centerStart,
                    centerTop: centerTop,
                    underHeight: underHeight,
                    underWidth: underWidth,
                    imgs: res.data,
                    bottomImgIndex: imgIndex,
                    imgIndex: imgIndex,
                    imgDB_ID: res.data[imgIndex].id,
                    imgSize: imgSize,
                })
                
            })
        .catch( err=>{
            log(`Error: ${err}`)
            const {centerWidth, centerHeight, ...rest} = state
            setState({
                centerWidth: containerWidth,
                centerHeight: containerHeight,
                ...rest,
            })
            alert('axios error')
        } )
    }, [])


    //calculation stuff
    const {imgDB_ID, imgIndex, imgs, bottomImgIndex, centerWidth, centerHeight, centerStart, centerTop, underHeight, underWidth} = state;
    
    const freeSpace = centerWidth/2 - underWidth/2 - padding - underHeight/2
    let toLeft;
    try{
        toLeft = freeSpace/bottomImgIndex
    }catch
    {
        toLeft = 0
    }

    let toRight;
    try{
        toRight = freeSpace/(imgs.length-bottomImgIndex+1)
    }catch{
        toRight = 0
    }

    const maxSpace = (underHeight/2)*0.9
    toLeft = maxSpace < toLeft ? maxSpace : toLeft
    toRight = maxSpace < toRight ? maxSpace : toRight

    let indexLeft = 0

    let indexRight;
    try {
        indexRight = imgs.length - bottomImgIndex - 2
    }catch
    {
        indexRight = 0
    }

    let zInd = 0
    
    return (
        <div className="canvas-container">
            <div className="toolbar">
                <button type="button" className="yes" onClick={()=>
                {
                    const {imgId, mode, imgURL, ...rest} = imgState
                    setImgState({
                        imgId: null,
                        mode: !mode,
                        imgURL: null,
                        ...rest,
                    })
                }}>
                    Create new
                </button>

                <button type="button" className="no" onClick={deleteImg}>
                    Delete it
                </button>
            </div>
            <div className="galery" ref={containerRef}>
                <img className="img-center"
                    id={imgDB_ID && {imgDB_ID} || null}
                    style={
                            {
                                width:`${centerWidth}px`,
                                height:`${centerHeight}px`,
                            }
                        }
                    src={(imgs && imgIndex) && imgs[imgIndex].url/* || (centerWidth && centerHeight && `https://via.placeholder.com/${centerWidth}x${centerHeight}`)*/}
                    onClick = { () => 
                        {
                            const {imgId, mode, imgURL, ...rest} = imgState
                            setImgState({
                                imgId: imgs[imgIndex].id,
                                mode: !mode,
                                imgURL: imgs[imgIndex].url,
                                ...rest,
                            })
                            
                        }
                    }
                />
                <div style={{top:`${centerHeight}px`}}>
                    {imgs &&           
                                imgs.map( (item, index) =>
                                {
                                    //styling stuff
                                    const styling = {}
                                    const diff = (underWidth - underHeight)/2
                                    let fnx
                                    if(index == bottomImgIndex)
                                    {
                                        styling.left = `${(centerWidth-underWidth)/2}px`
                                        styling.width = `${underWidth}px`
                                        styling.height = `${underHeight}px`
                                        fnx = renderImg
                                    }else
                                    {
                                        styling.width = `${underHeight}px`
                                        styling.height = `${underHeight/2}px`
                                        if(index < bottomImgIndex)
                                        {
                                            styling.transform = 'rotate(-90deg)'
                                            styling.left = `${(-1)*(diff)/2 + toLeft*indexLeft++}px`
                                            styling.bottom = `${(diff)/2}px`
                                            styling.zIndex = `${zInd++}`
                                            styling.borderBottom = "2px solid red"
                                            fnx = prev
                                        }else
                                        {
                                            styling.transform = 'rotate(90deg)'
                                            //debugger
                                            styling.left = `${centerWidth - underHeight + (diff)/2 - toRight*indexRight--}px`
                                            styling.bottom = `${(diff)/2}px`
                                            styling.zIndex = `${zInd--}`
                                            styling.borderBottom = "2px solid red"
                                            fnx = next
                                        }
                                    }
                                    //render
                                    return (
                                        <img className="img-under"
                                            style={{...styling}}
                                            id={index}
                                            key={item.id}
                                            src={item.url}
                                            onClick={fnx}
                                        />
                                    )
                                })
                            }
                </div>
            </div>
        </div>
    )
}