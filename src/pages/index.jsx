import './estilo.css'
import { useState, useEffect } from 'react'

function Poke(){
    
    //Bulbasaur img: https://imgs.search.brave.com/ixVPZyOi4UpeGVwgrMrmRT93HxTDHdq9xEWmaRKl6Ps/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMucG9rZW1vbi5j/b20vYXNzZXRzL2Nt/czIvaW1nL3Bva2Vk/ZXgvZnVsbC8wMDEu/cG5n
    //PokeAPI Sprite path: ['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    //PokeAPI URL: https://pokeapi.co/api/v2/pokemon/ditto
    //console.log(pikamon)

    // Cria o dicionário que guardará os dados do pókemon;

    const [pikamon, setPikamon] = useState({})

    const [value, setValue] = useState(1)

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
                img: pikamon_data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'],
                hp: pikamon_data['stats']['0']['base_stat'],
                atk: pikamon_data['stats']['1']['base_stat'],
                def: pikamon_data['stats']['2']['base_stat']
            }
        )
    }

    const valoro = (event) => {
        setValue(event.target.value)
        //console.log(value)
    }

    useEffect(() => {
        pikamon_change(value)
    }, [value])

    const pika_next = () => {
        if(value != 649){
            setValue(value + 1)
        }
    }

    const pika_return = () => {
        if(value != 1){
            setValue(value - 1)
        }
    }

    //console.log(pikamon)

    return(
        <>
        <div className='div_pai'>
            <button onClick={pika_return} className='buttons'>Voltar</button>
            <div className='div_main'>
                <input onChange={valoro} className='searchBar' type="text" placeholder='Nome ou Id'/>
                <span>{pikamon['id']} - {pikamon['nome']}</span>
                <img className='pikamon_img' src={pikamon['img']} alt="" />
                <div className='data'>
                    <span className='atk'>ATK</span><span className='def'>DEF</span><span className='life'>LIFE</span>
                    <span className='atk'>{pikamon['atk']}</span><span className='def'>{pikamon['def']}</span><span className='life'>{pikamon['hp']}</span>
                </div>
            </div>
            <button onClick={pika_next} className='buttons'>Proximo</button>
        </div>
        </>
    )
}


export default Poke
