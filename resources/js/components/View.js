import React, {useRef, useEffect, useState} from 'react';
import axios from 'axios';


const log = (...x) =>
{
    console.log(...x)
}

export const View = ({setIsPaintMode, isPaintMode}) =>
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
    
    useEffect(()=>
    {
        isPaintMode
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
                if(isPaintMode.imgId)
                {
                    index = res.data.findIndex( (img)=>
                    {
                        // debugger
                        return isPaintMode.imgId === img.id
                    } )
                }

                let imgIndex;
                if(index !== null)
                {
                    imgIndex = index
                } else
                {
                    try {
                        imgIndex = res.data.length-1
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
                    //bottomImgIndex: res.data.length-1,
                    bottomImgIndex: imgIndex,
                    imgIndex: imgIndex,
                    imgDB_ID: res.data[imgIndex].id,
                })
            })
        .catch( err=>{
            log(`Error: ${err}`)
            const {centerWidth, centerHeight, ...rest} = state
            setState({
                centerWidth: containerWidth,
                centerHeight: containerHeight,
                rest,
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
        //debugger
        toRight = freeSpace/(imgs.length-bottomImgIndex+1)
        //debugger
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
        //debugger
    }catch
    {
        indexRight = 0
    }

    let zInd = 0
    
    return (
            <div className="galery" ref={containerRef}>
                <img className="img-center"
                    id={imgDB_ID && {imgDB_ID} || null}
                    style={
                            {
                                width:`${centerWidth}px`,
                                height:`${centerHeight}px`,
                            }
                        }
                    src={imgs && imgs[imgIndex].url || (centerWidth && centerHeight && `https://via.placeholder.com/${centerWidth}x${centerHeight}`)}
                    onClick = { () => 
                        {
                            const {imgId, mode} = isPaintMode
                            setIsPaintMode({
                                imgId: imgDB_ID,
                                mode: !mode,
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
    )
}