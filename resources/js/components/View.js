import React, {useRef, useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import {Toastie} from './Toastie';


const log = (...x) =>
{
    console.log(...x)
}


const Img = () =>
{
    <div><img src="images/toasty.jpg"/></div>
}

export const View = ({setImgState, imgState}) =>
{
    const ratio = 2 //width/height
    const padding = 10 //padding between center and right/left

    // // const contextRef = useRef(null)
    // const [imgs, setImgs] = useState(null)
    const containerRef = useRef(null)

    const next = (event) =>{
        {event}
        if(!imgState.imgs) return
        if(imgState.bottomImgIndex === imgState.imgs.length-1) return
        const {bottomImgIndex, ...rest} = imgState
        const nextImg = bottomImgIndex+1
        event.target.style.transform = 'rotate(90deg)';
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
            toast.success("Deleted", {autoClose: 1000})
            if(Math.random() * 10 < 2)
            {
                toast(<Toastie/>, {autoClose: 500, position:toast.POSITION.BOTTOM_RIGHT})
            }
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
            toast.error("Server error", {position: toast.POSITION.TOP_CENTER, autoClose: 2000})
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
        .catch( err => {
            const {centerWidth, centerHeight, imgURL, mode, ...rest} = imgState
            if(err.response.status === 403)
            {
                toast.info("You need to log in to save drawing",
                        {position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000})
                setImgState({
                    centerWidth: containerRef.current.clientWidth,
                    centerHeight: containerRef.current.clientHeight,
                    imgURL: null,
                    mode: !mode,
                    ...rest,
                })
            }else
            {
                toast.error("Server error",
                        {position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000})
                setImgState({
                    centerWidth: containerRef.current.clientWidth,
                    centerHeight: containerRef.current.clientHeight,
                    imgURL: `https://via.placeholder.com/${containerRef.current.clientWidth}x${containerRef.current.clientHeight}`,
                    mode,
                    ...rest,
                })
            }
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
    let animationZIndex = 0
    let animationDelay = 0
    const duration = 0.1
    const aboveDelay = imgs ? duration * imgs.length : 0

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

                {imgId != null &&
                    <button type="button" className="no" onClick={deleteImg}>
                        Delete it
                    </button>
                }
            </div>
            <div className="galery" ref={containerRef}>
                {
                    imgId &&
                    <motion.img className="img-center"
                        initial = {
                                {
                                    //animate above
                                    top : `${1000}px`,
                                    left : `${1000/2}px`,
                                    width : `${0}px`,
                                    height : `${0}px`,
                                }
                            }
                        animate={
                                {
                                    top: '0px',
                                    left: '0px',
                                    width:`${centerWidth}px`,
                                    height:`${centerHeight}px`,
                                }
                            }
                        transition={{duration:0.2, delay: aboveDelay}}

                        whileHover={{scale: 1.05, zIndex: 100}}
                        
                        id={imgId && {imgId} || "null"}
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

                    ||

                    <img className="img-center"
                        style={
                                {
                                    width:`${centerWidth}px`,
                                    height:`${centerHeight}px`,
                                }
                            }
                        
                        id={imgId && {imgId} || "null"}
                        src={imgURL}
                    />
                }
                <div style={{top:`${centerHeight}px`}}>
                    {imgs &&           
                                imgs.map( (item, index) =>
                                {
                                    
                                    //styling stuff
                                    const styling = {}
                                    const diff = (underWidth - underHeight)/2
                                    let fnx

                                    const init = {
                                        left : `${(centerWidth-underWidth)/2}px`,
                                        width : `${underWidth}px`,
                                        height : `${underHeight}px`,
                                        bottom : `${0}px`,
                                        zIndex: animationZIndex--,
                                    }
                                    if(index === bottomImgIndex)
                                    {
                                        styling.transform = 'rotate(0deg)'
                                        styling.left = `${(centerWidth-underWidth)/2}px`
                                        styling.width = `${underWidth}px`
                                        styling.height = `${underHeight}px`
                                        styling.bottom = `${0}px`

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
                                            fnx = prev
                                        }else
                                        {
                                            styling.transform = 'rotate(90deg)'
                                            styling.left = `${centerWidth - underHeight + (diff)/2 - toRight*indexRight--}px`
                                            styling.bottom = `${(diff)/2}px`
                                            styling.zIndex = `${zInd--}`
                                            fnx = next
                                        }
                                    }
                                    const delay = animationDelay
                                    animationDelay += duration
                                    //render
                                    return (
                                        <motion.img
                                            initial={{...init}}
                                            animate={{...styling}}
                                            transition={{duration: duration, delay:animationDelay, }}
                                            
                                            className="img-under"
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