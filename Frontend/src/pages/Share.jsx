import { useRef, useState } from 'react'

const Share = () => {

  const [text, setText] = useState('');
  const [code , setCode ] = useState(0);
  const [num, setNum] = useState(0);
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const [url, setUrl] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const openFilePicker = () => {
    fileRef.current?.click();
  }


  const handleClick = async () => {
    if(text.trim() !== ''){
      const res = await fetch('http://localhost:5000/app/codegen',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({text}),
    });

    if(res.ok){
      const data = await res.json();
      setCode(data);
    }
    
    setText('');
   }
   else if(file !== null){
      const formData = new FormData();
      formData.append("file",file);
      try{
        const res = await fetch('http://localhost:5000/app/codegen2',{
          method: 'POST',
          credentials: 'include',
          body: formData,
        })

        if(res.ok){
          const data = await res.json();
          setCode(data);
        }
      }catch(err){
        console.error("Error uploading file:", err);
      }
      setFile(null);
      fileRef.current.value = null;
   }
   else{
    alert("Please enter some text to share");
   }
  }

  const handleRecieve = async () => {

    const res = await fetch("http://localhost:5000/app/getdata",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({code: num}),
    });

    if(res.ok){
      const data = await res.json();
      if(data.text) {
        console.log("Text data received");
        setText(data.text);
      } else {
        alert("File data received");
        setUrl(data.url);
        
      }
    }
    setNum(0);
  }

  return (
    <>
      <div className='share-layout'>
        <aside className='share-panel'>
          <div className='share-card'>
            <label className='share-label'>Text or Message</label>
            <textarea value={text} className='txtarea' onChange={handleChange} placeholder='Paste text or code to share...'></textarea>
            <input type='file' ref={fileRef} className='hidden-file-input' onChange={handleFileChange} />
            <button type='button' className={`upload-btn ${file ? 'selected' : ''}`} onClick={openFilePicker}>
              {file ? 'File Selected' : 'Upload File'}
            </button>
            {file && <p className='selected-file-name'>{file.name}</p>}
            <button className='btn primary' onClick={handleClick}>Share</button>
          </div>
        </aside>

        <main className='share-main'>
          <section className='share-receive'>
            <h2>Receive</h2>
            <div className='share-code-input'>
              <textarea value={num} onChange={(e) => setNum(+e.target.value)} className='codetxt' placeholder='Enter code'></textarea>
              <button className='btn' onClick={handleRecieve}>Get Data</button>
            </div>

            <div className='share-code-display card'>
              <h3>Generated Code</h3>
              <pre className='code-box'>{code || '—'}</pre>
            </div>
          </section>

          <section className='share-preview'>
            <h2>Preview</h2>
            <div className='share-iframe-wrapper'>
              <iframe src={url} className='share-iframe' title='preview'/>
            </div>
          </section>
        </main>
      </div>

    </>
  )
}

export default Share
