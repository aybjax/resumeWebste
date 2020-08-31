import React, { useState } from 'react';
import {Paint} from './Paint';
import {View} from './View';

export const Container = () =>
{
    const [isPaintMode, setIsPaintMode] = useState({
        imgId: null,
        mode: false,
    })

    return (
        <>
        {
            isPaintMode.mode && <Paint setIsPaintMode = {setIsPaintMode} isPaintMode = {isPaintMode}/>
        }

        {
            !isPaintMode.mode && <View setIsPaintMode = {setIsPaintMode}  isPaintMode = {isPaintMode}/>
        }
        </>
    )
}