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

    const next = () =>{
        
        if(!imgState.imgs) return
        if(imgState.bottomImgIndex === imgState.imgs.length-1) return
        const {bottomImgIndex, ...rest} = imgState
        const nextImg = bottomImgIndex+1
        setImgState({
            bottomImgIndex: nextImg,
            ...rest
        })
    }

    const prev = () =>{
        
        if(!imgState.imgs) return
        if(imgState.bottomImgIndex == 0) return
        const {bottomImgIndex, ...rest} = imgState
        const nextImg = bottomImgIndex-1
        setImgState({
            bottomImgIndex: nextImg,
            ...rest
        })
    }

    const renderImg = () =>{
        
        if(!imgState.imgs) return
        const {imgIndex, imgId, imgURL, ...rest} = imgState
        log(imgURL)
        alert(imgURL)
        const nextImg = imgState.bottomImgIndex
        const imgs = imgState.imgs
        setImgState({
            imgIndex: nextImg,
            imgId: imgs[nextImg].id,
            imgURL: imgs[nextImg].url,
            ...rest
        })
    }

    const deleteImg = () =>{
        const {imgId, ...rest} = imgState
        axios.delete(`painting/paint/${imgId}`)
        .then(res => {
            alert("deleted")
            // const {bottomImgIndex, imgSize, imgs, imgIndex, imgId, imgURL, ...rest} = imgState

            // imgs.splice(imgIndex, 1)
            // let newSize = imgs.length - 1
            // let newIndex = imgIndex

            // if(newSize < 0)
            // {
            //     newIndex = null
            //     newSize = null
            // }else if(newIndex>newSize)
            // {
            //     newIndex = newSize
            // }
            
            // setImgState({
            //     ...rest,
            //     bottomImgIndex:newIndex,
            //     imgs: imgs,
            //     imgIndex:newIndex,
            //     imgId: newIndex ? imgs[newIndex].id : null,
            //     imgSize: newSize,
            //     imgURL: newIndex ? imgs[newIndex].url : null
            // })

            const {bottomImgIndex, imgSize, imgs, imgIndex, imgId, imgURL, ...rest} = imgState
            setImgState({
                    ...rest,
                    bottomImgIndex: null,
                    imgs: null,
                    imgIndex: null,
                    imgId: null,
                    imgSize: null,
                    imgURL: null,
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
                const imgSize = res.data.length-1
                if(imgState.imgId !== null)
                {
                    index = res.data.findIndex( (img)=>
                    {

                        return imgState.imgId === img.id
                    } )
                }else
                {
                    index = imgSize
                }


                if(res.data.length>0)
                {
                    log(res.data)
                    log(index)
                }
                setImgState({
                    centerWidth: centerWidth,
                    centerHeight: centerHeight,
                    centerStart: centerStart,
                    centerTop: centerTop,
                    underHeight: underHeight,
                    underWidth: underWidth,
                    imgs: res.data,
                    bottomImgIndex: index,
                    imgIndex: index,
                    imgId: (res.data.length>0 ? res.data[index].id : null),
                    imgSize: imgSize,
                    imgURL: (res.data.length>0 ? res.data[index].url : `https://via.placeholder.com/${centerWidth}x${centerHeight}`),
                })
            })
        .catch( err=>{
            log(`Error: ${err}`)
            const {centerWidth, centerHeight, imgURL, ...rest} = imgState
            setImgState({
                centerWidth: containerWidth,
                centerHeight: containerHeight,
                imgURL: `https://via.placeholder.com/${centerWidth}x${centerHeight}`,
                ...rest,
            })
            alert('axios error')
        } )
    }, [imgState.imgSize])


    //calculation stuff
    const {imgId, imgIndex, imgURL, imgs, bottomImgIndex, centerWidth, centerHeight, underHeight, underWidth} = imgState;

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
                    id={imgId && {imgId} || "null"}
                    style={
                            {
                                width:`${centerWidth}px`,
                                height:`${centerHeight}px`,
                            }
                        }
                    src={imgURL}
                    onClick = { () => 
                        {
                            const {mode, ...rest} = imgState
                            setImgState({
                                mode: !mode,
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
                                    if(index === bottomImgIndex)
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