import React, { useState, useMemo } from 'react';
import './styles.css'
import camera from '../../assets/camera.png';

import api from '../../services/api'

export default function New( {history} ) {

    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null;
        },
        [thumbnail]
    );

    async function handleSubmit(e) {
        console.log("alooo")
        e.preventDefault();
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('techs', techs);
        data.append('price', price);
        data.append('company', company);

        const response = await api.post('/spots', data, {
            headers: { user_id }
        });

        console.log(response);

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>

            <label 
                id="thumbnail" 
                style={{backgroundImage: `url(${preview})`}}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select Image"/>
            </label>

            <label htmlFor="company">EMPRESA *</label>
            <input
                id="company" 
                type="text"
                placeholder="Sua empresa"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgulas)</span></label>
            <input
                id="techs" 
                type="text"
                placeholder="Tecnologias usadas"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="price">VALOR DIÁRIO <span>(em branco se gratuito)</span></label>
            <input
                id="price" 
                type="text"
                placeholder="Valor diário"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />

            <button type="submit" className="btn">Cadastrar Spot</button>
        </form>
    );
}