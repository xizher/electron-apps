import React, { useCallback, useEffect, useState } from 'react'
import { TextField, Button, ButtonGroup, Radio, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import { baseUtils, cryptoUtils } from '@xizher/js-utils'

type ActionType = 'ENCRYPTO' | 'DECRYPTO'

function App() {

  const [type, setType] = useState<ActionType>('ENCRYPTO')
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [key, setKey] = useState('')
  const [iv, setIv] = useState('')
  const [msgVisible, setMsgVisible] = useState(false)
  
  const reset = useCallback(() => {
    setInputText('')
    setOutputText('')
  }, [])

  const copy = useCallback(() => {
    baseUtils.copyText(outputText).then(() => {
      setMsgVisible(true)
    })
  }, [outputText])

  useEffect(() => {
    cryptoUtils
      .setGlobelIV(iv)
      .setGlobelKey(key)
    if (!inputText) {
      setOutputText('')
      return
    }
    if (type === 'ENCRYPTO') {
      try {
        setOutputText(cryptoUtils.encrypto(inputText))
      } catch { console.warn('encrypto error') }
    } else if (type === 'DECRYPTO') {
      try {
        setOutputText(cryptoUtils.decrypto(inputText))
      } catch { console.warn('decrypto error') }
    }
  }, [inputText, key, iv, type])
 
  return (
    <div className="app">
      <h2>🔐String Crypto🔐</h2>
      <div>
        <Radio
          color="default"
          checked={ type === 'ENCRYPTO' }
          onChange={ () => setType('ENCRYPTO') }
        />
        <span
          className="radio-label"
          onClick={ () => setType('ENCRYPTO') }
        >
          Encrypto
        </span>
        <Radio
          color="default"
          checked={ type === 'DECRYPTO' }
          onChange={ () => setType('DECRYPTO') }
          value="Decrypto"
        />
        <span
          className="radio-label"
          onClick={ () => setType('DECRYPTO') }
        >
          Decrypto
        </span>
      </div>
      <TextField
        label="Key"
        value={ key }
        onChange={ e => setKey(e.target.value) }
        variant="filled"
        fullWidth
        type="password"
      />
      <br/>
      <TextField
        label="IV"
        value={ iv }
        onChange={ e => setIv(e.target.value) }
        variant="filled"
        fullWidth
        type="password"
      />
      <br/>
      <TextField
        label="Input"
        multiline
        rows={ 8 }
        value={ inputText }
        onChange={ e => setInputText(e.target.value) }
        variant="filled"
        fullWidth
      />
      <br/>
      <TextField
        label="Output"
        multiline
        rows={ 8 }
        value={ outputText }
        variant="filled"
        fullWidth
        disabled
      />
      <br/>
      <ButtonGroup
        fullWidth
      >
        <Button
          variant="contained"
          onClick={ reset }
        >
          🔐Rest🔐
        </Button>
        <Button
          variant="contained"
          onClick={ copy }
        >
          🔐Copy🔐
        </Button>
      </ButtonGroup>
      <Snackbar open={ msgVisible } autoHideDuration={ 3000 } onClose={ () => setMsgVisible(false) }>
        <Alert onClose={ () => setMsgVisible(false) } severity="success">
          Copy successfully
        </Alert>
      </Snackbar>
    </div>
  )
}

export default App
