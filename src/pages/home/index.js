import React, { useState } from "react";
import "./home.css"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
    return (
        <>
        <h1>{useSelector(state => state.usuarioEmail) }</h1>
        <h1>Logado: {useSelector(state => state.usuarioLogado) }</h1>
        </>
    )
}