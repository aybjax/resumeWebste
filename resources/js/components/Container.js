import React, { useState } from 'react';
import {Paint} from './Paint';
import {View} from './View';

export const Container = () =>
{
    const [isPaintMode, setIsPaintMode] = useState({
        imgId: -1,
        mode: false,
    })

    const changeMode = (id = -1) => () =>
    {
        const {imgId, mode} = isPaintMode
        setIsPaintMode({
            imgId: id,
            mode: !mode,
        })
    }

    return (
        <>
        {
            isPaintMode.mode && <Paint changeMode = {changeMode} isPaintMode = {isPaintMode}/>
        }

        {
            !isPaintMode.mode && <View changeMode = {changeMode}/>
        }
        </>
    )
}