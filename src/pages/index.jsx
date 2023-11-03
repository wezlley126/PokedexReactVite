import './estilo.css'
import { useState, useEvent, useEffect } from 'react'

function Poke(){
    
    //Bulbasaur img: https://imgs.search.brave.com/ixVPZyOi4UpeGVwgrMrmRT93HxTDHdq9xEWmaRKl6Ps/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMucG9rZW1vbi5j/b20vYXNzZXRzL2Nt/czIvaW1nL3Bva2Vk/ZXgvZnVsbC8wMDEu/cG5n
    //PokeAPI Sprite path: ['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    //PokeAPI URL: https://pokeapi.co/api/v2/pokemon/ditto
    //console.log(pikamon)

    // Cria o dicionário que guardará os dados do pókemon;

    const [pikamon, setPikamon] = useState(
        {
            id: '1',
            nome: 'bulbasaur',
            img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif'
        }
    )

    const [value, setValue] = useState(0)

    // Realiza a requisição para pokeAPI;

    const poke_request = async (pokemon) => {
        const poke_data = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon)
        const poke_json = await poke_data.json()
        return poke_json
    }

    // Seta o dicionário com os dados que serão exibidos;

    const pikamon_change = async (pokemon) => {
        const pikamon_data = await poke_request(pokemon)
        //console.log(pikamon_data)
        setPikamon(
            {
                id: pikamon_data['id'],
                nome: pikamon_data['name'],
                img: pikamon_data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
            }
        )
    }

    const valoro = (event) => {
        setValue(event.target.value)
        console.log(value)
    }

    useEffect(() => {
        pikamon_change(value)
    }, [value])

    //console.log(pikamon)

    return(
        <>
        <div class='div_pai'>
            <button>Voltar</button>
            <div class='poke'>
                <img src={pikamon['img']} alt="" />
                <span>{pikamon['nome']}</span><span>{pikamon['id']}</span>
                <input onChange={valoro} type="text" placeholder='Nome ou Id' />
            </div>
            <button>Proximo</button>
        </div>
        </>
    )
}


export default Poke