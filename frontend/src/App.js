import './App.css';
import './normal.css';
import Loading from './components/loading.js'
import React, { useState } from 'react'
import Slider from '@mui/material/Slider';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  TextField, 
  InputAdornment, 
  IconButton,
  // CircularProgress
  // Box, 
  // List, 
  // ListItem, 
  // ListItemText 
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'


// import { makeStyles } from '@mui/material/styles';


function App() {

  // State Hooks
  const [wordCount, setWordCount] = useState([50, 100]);
  const [syllablesCount, setSyllablesCount] = useState(2);
  const [lexileLevel, setLexileLevel] = useState(100);
  const [customFocusInput, setCustomFocusInput] = useState("")
  const [customFocusInputLog, setCustomFocusInputLog] = useState([])
  const [sightWordInput, setSightWordInput] = useState("")
  const [sightWordInputLog, setSightWordInputLog] = useState([])
  const [generatedText, setGeneratedText] = useState("")
  const [textLoading, setTextLoading] = useState(false)



  // Handle State Change Functions
  const handleWordCountRangeSliderChange = (e, val) => {
    setWordCount(val)
  }

  const handleSyllablesCountSliderChange = (e, val) => {
    setSyllablesCount(val)
  }

  const handleLexileLevelSliderChange = (e, val) => {
    setLexileLevel(val)
  }

  const handleCustomFocusInputChange = (e) => {
    setCustomFocusInput(e.target.value)
    console.log(customFocusInput)
  }

  const handleSightWordInputChange = (e) => {
    setSightWordInput(e.target.value)
    console.log(sightWordInput)
  }

  const handleCustomFocusDelete = (focus) => {
    const focuses = customFocusInputLog.filter((item) => item !== focus)
    setCustomFocusInputLog(focuses)
  };

  const handleSightWordDelete = (word) => {
    const words = sightWordInputLog.filter((item) => item !== word)
    setSightWordInputLog(words)
  };

  // const handleGeneratedTextAdd = (char) => {
  //   const cur = generatedText
  //   setGeneratedText(cur + char)
  // }

  async function handleGeneratedText(text) {
    console.log(text);
    var limit = text.length
    for (var i = 0; i <= limit; i++) {
      setGeneratedText(text.slice(0, i))
      // if (text[i] === "\n") {
      //   console.log("new line found")
      //   setGeneratedText("hellow")
      //   limit += 5
      // } else {
      //   setGeneratedText(text.slice(0, i))
      // }

      if (text[i] === " ") {
        await new Promise(r => setTimeout(r, Math.floor(Math.random() * 100)));
      } else {
        await new Promise(r => setTimeout(r, Math.floor(Math.random() * 10)));
      }
    }
    setTextLoading(false)

    // console.log(text);
    // var lines = text.split('\n')
    // console.log(lines)
    // for (var j = 0; j < lines.length; j++) {
    //   for (var i = 0; i < lines[j].length; i++) {
    //     setGeneratedText(generatedText + lines[j].slice(0, i))
    //     if (lines[j][i] === " ") {
    //       await new Promise(r => setTimeout(r, Math.floor(Math.random() * 100)));
    //     } else {
    //       await new Promise(r => setTimeout(r, Math.floor(Math.random() * 10)));
    //     }
    //   }
    // }
    // setTextLoading(false)
  }
  
  const generate = (e) => {
    setGeneratedText("")
    if (!textLoading) {
      setTextLoading(true);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          length: wordCount[1],
          max_syllables: syllablesCount,
          lexile_level: lexileLevel,
          instruction_phonemes: customFocusInputLog,
          sight_words: sightWordInputLog,
          temperature: 0.7,
          system_message: "You are a curriculum developer who writes short passages for young children to learn reading."
        })
      };
      
      fetch('//164.90.246.212:443/v1/generate', requestOptions)
        .then(response => response.json())
        .then(data => handleGeneratedText(data['text']))
        .catch(error => setTextLoading(false));
    }
  }

  async function handleFocusSubmit(e) {
    e.preventDefault();
    console.log(customFocusInput)
    if (customFocusInput !== "") {
      setCustomFocusInputLog([...customFocusInputLog, customFocusInput])
      setCustomFocusInput("");
    }
  }

  async function handleSightWordSubmit(e) {
    e.preventDefault();
    console.log(sightWordInput)
    if (sightWordInput !== "") {
      setSightWordInputLog([...sightWordInputLog, sightWordInput])
      setSightWordInput("");
    }
  }

  return (
    <div className="App">
      <aside className='sidemenu'>
        <div className='generated-text'>
          {generatedText}
          <Loading loading = {textLoading}/>
        </div>
      </aside>
      <section className='filtersbox'>
      <div className='title'>
        Decodable Text Generator
      </div>
      <div className='filters'>
        <div className='sliders'>
          <div className='slider-card'>
            <div className='slider-card-title'>
              Word Count
            </div>
              <Slider
                  size="large"
                  defaultValue={[50, 100]}
                  valueLabelDisplay="auto"
                  onChange={handleWordCountRangeSliderChange}
                  max={500}
              />
            <div className='slider-count'>
              <div> min: {wordCount[0]} </div>
              <div> max: {wordCount[1]} </div>
            </div>
          </div>
          <div className='slider-card'>
            <div className='slider-card-title'>
              Word Syllables
            </div>
            <Slider
                size="large"
                defaultValue={2}
                valueLabelDisplay="auto"
                onChange={handleSyllablesCountSliderChange}
                max={10}
            />
            <div className='slider-count'>
              max: {syllablesCount}
            </div>
          </div>
          <div className='slider-card'>
            <div className='slider-card-title'>
              Lexile Level
            </div>
            <Slider
                size="large"
                defaultValue={100}
                valueLabelDisplay="auto"
                onChange={handleLexileLevelSliderChange}
                max={1000}
            />
            <div className='slider-count'>
              level: {lexileLevel}
            </div>
            
          </div>
        </div>
        <div className='accordion'>
          <Accordion sx={{backgroundColor: '#F5F5F5', borderRadius: 1, boxShadow: "none"}}>
            <AccordionSummary id='instructional-focus' aria-controls='instructional-focus-header' expandIcon={<ExpandMoreIcon/>}>
              <div>
                Instructional Focus
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className='accordion-details'>
                <div className='accordion-subtitle'> 
                  Add custom focus areas here! Ex. "Short Vowels", "VCe Words"
                </div>
                <div className='custom-focus-input-holder'>
                  <form onSubmit={handleFocusSubmit}>
                    <TextField 
                    fullWidth size="small" 
                    variant='outlined'
                    onInput={handleCustomFocusInputChange}
                    value={customFocusInput}
                    style={{background: "rgb(255, 255, 255)"}}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <AddIcon />
                        </InputAdornment>
                      ),
                    }}>
                  </TextField>
                  </form>
                </div>
                <div className='accordion-subtitle'> 
                  Current Focus Items:
                </div>
                <div className='current-items-box'>
                  {customFocusInputLog.map((focus, index) => {
                    return (
                      <div key={index} className='selected-item-box'>
                        <div className='selected-item-text'>
                          {focus}
                        </div>
                        {/* <IconButton aria-label="delete" name={focus} onClick={handleCustomFocusDelete}> */}
                        <IconButton aria-label="delete" onClick={() => handleCustomFocusDelete(focus)}>
                          <ClearIcon />
                        </IconButton>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className='accordion'>
          <Accordion sx={{backgroundColor: '#F5F5F5', borderRadius: 1, boxShadow: "none"}}>
            <AccordionSummary id='sight-words' aria-controls='sight-words-header' expandIcon={<ExpandMoreIcon/>}>
              <div>
                 Sight Words
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className='accordion-details'>
                <div className='accordion-subtitle'> 
                  Add custom sight words here! 
                </div>
                <div className='custom-focus-input-holder'>
                  <form onSubmit={handleSightWordSubmit}>
                    <TextField 
                    fullWidth size="small" 
                    variant='outlined'
                    onInput={handleSightWordInputChange}
                    value={sightWordInput}
                    style={{background: "rgb(255, 255, 255)"}}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <AddIcon />
                        </InputAdornment>
                      ),
                    }}>
                  </TextField>
                  </form>
                </div>
                <div className='accordion-subtitle'> 
                  Current Sight Words:
                </div>
                <div className='current-items-box'>
                  {sightWordInputLog.map((word, index) => {
                    return (
                      <div key={index} className='selected-item-box'>
                        <div className='selected-item-text'>
                          {word}
                        </div>
                        <IconButton aria-label="delete" onClick={() => handleSightWordDelete(word)}>
                          <ClearIcon />
                        </IconButton>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className='generate-button' onClick={generate}>
          <div className='generate-button-text'>
            Generate
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}

export default App;
