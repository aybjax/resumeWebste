import React, {useRef, useEffect, useState} from 'react';
import axios from 'axios';


const log = (...x) =>
{
    console.log(...x)
}

export const View = ({changeMode}) =>
{
    const ratio = 2 //width/height
    const padding = 10 //padding between center and right/left

    // // const contextRef = useRef(null)
    // const [imgs, setImgs] = useState(null)
    const containerRef = useRef(null)
    const [centerImg, setCenterImg] = useState({
        centerWidth: 0,
        centerHeight: 0,
        centerStart: 0,
        centerTop: 0,
        underHeight: 0,
        underWidth: 0,
        chooseImg:0,
        imgs: null,
        toRender:null,
        imgId: null,
    })

    const next = () =>{
        if(!imgs) return
        if(centerImg.chooseImg == imgs.length-1) return
        const {chooseImg, ...rest} = centerImg
        const nextImg = chooseImg+1
        log(`to next ${nextImg}`)
        setCenterImg({
            chooseImg: nextImg,
            ...rest
        })
    }

    const prev = () =>{
        if(!imgs) return
        if(centerImg.chooseImg == 0) return
        const {chooseImg, ...rest} = centerImg
        const nextImg = chooseImg-1
        log(`to prev ${nextImg}`)
        setCenterImg({
            chooseImg: nextImg,
            ...rest
        })
    }

    const renderImg = () =>{
        if(!imgs) return
        const {toRender,...rest} = centerImg
        const nextImg = chooseImg
        log(`render ${toRender}`)
        setCenterImg({
            toRender: nextImg,
            ...rest
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
                
                const toRender = 0

                setCenterImg({
                    centerWidth: centerWidth,
                    centerHeight: centerHeight,
                    centerStart: centerStart,
                    centerTop: centerTop,
                    underHeight: underHeight,
                    underWidth: underWidth,
                    imgs: res.data,
                    //chooseImg: res.data.length-1,
                    chooseImg: 0,
                    toRender:0,
                    imgId: res.data[toRender].id,
                })
            })
        .catch( err=>{
            log(`Error: ${err}`)
            const {centerWidth, centerHeight, ...rest} = centerImg
            setCenterImg({
                centerWidth: containerWidth,
                centerHeight: containerHeight,
                rest,
            })
            alert('axios error')
        } )
    }, [])


    //calculation stuff
    const {imgId, toRender, imgs, chooseImg, centerWidth, centerHeight, centerStart, centerTop, underHeight, underWidth} = centerImg;
    
    const freeSpace = centerWidth/2 - underWidth/2 - padding - underHeight/2
    let toLeft;
    try{
        toLeft = freeSpace/chooseImg
    }catch
    {
        toLeft = 0
    }

    let toRight;
    try{
        //debugger
        toRight = freeSpace/(imgs.length-chooseImg+1)
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
        indexRight = imgs.length - chooseImg - 2
        //debugger
    }catch
    {
        indexRight = 0
    }

    let zInd = 0
    
    return (
            <div className="galery" ref={containerRef}>
                <img className="img-center"
                    id={imgId && {imgId} || -1}
                    style={
                            {
                                width:`${centerWidth}px`,
                                height:`${centerHeight}px`,
                            }
                        }
                    src={imgs && imgs[toRender].url || (centerWidth && centerHeight && `https://via.placeholder.com/${centerWidth}x${centerHeight}`)}
                    onClick = {changeMode(imgId)}
                />
                <div style={{top:`${centerHeight}px`}}>
                    {imgs &&           
                                imgs.map( (item, index) =>
                                {
                                    //styling stuff
                                    const styling = {}
                                    const diff = (underWidth - underHeight)/2
                                    let fnx
                                    if(index == chooseImg)
                                    {
                                        styling.left = `${(centerWidth-underWidth)/2}px`
                                        styling.width = `${underWidth}px`
                                        styling.height = `${underHeight}px`
                                        fnx = renderImg
                                    }else
                                    {
                                        styling.width = `${underHeight}px`
                                        styling.height = `${underHeight/2}px`
                                        if(index < chooseImg)
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