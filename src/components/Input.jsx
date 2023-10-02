import React, { useState } from 'react'
import "./Input.css"
import { Button } from '@mui/material';

function Input() {
   const[url,setUrl] = useState('');
   const[shortenUrl,setShortenUrl] = useState('');
   const[check,setCheck] = useState(false);
   const[error,setError] = useState(false);
   const[copy,setCopy] = useState('Copy')
   const urlChange = (e) =>{
       setUrl(e.target.value)
   }
    
   const shortUrl = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.shrtco.de/v2/shorten?url=${url}`
      )
      const data = await response.json()
      setShortenUrl(data.result.full_short_link);
      setCheck(true)
      setError(false)
      setCopy('Copy')
    } catch (e) {
      console.log(e);
      setError(true)
     
    }
};

  const handleClick = () =>{ 
    navigator.clipboard.writeText(shortenUrl)                  
    setCopy('Copied')
  }

  return (
    <div className='container'>
        <h1>Paste the Url to be shortened</h1>
        <div className='wrap'>
        <input type="text" placeholder='Enter link here' onChange={urlChange}/>
         <Button className='btn' variant="contained" onClick={shortUrl}type='submit'>submit</Button>
         <div className={error? 'bad':'result'}>
         <a target="_blank" href={shortenUrl} rel="noopener noreferrer">{check && shortenUrl}</a>
        {check && <button className='btn2' onClick={handleClick}>{copy}</button>} 
         </div>
         <div className={error ? 'errcon' :  'con'}>
         {error && <p className='error'>Enter valid url</p>}
         </div>
         </div>
    </div>
  )
}

export default Input