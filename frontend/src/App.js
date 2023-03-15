import './App.css';
import './normal.css';
// import SliderFilter from './components/SliderFilter.tsx'
import React, { useState } from 'react'
import Slider from '@mui/material/Slider';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  TextField, 
  InputAdornment, 
  IconButton,
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

  const handleCustomFocusDelete = (e, focus) => {
    console.log(e)
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
    setSightWordInputLog([...sightWordInputLog, sightWordInput])
    setSightWordInput("");
  }

  return (
    <div className="App">
      <aside className='sidemenu'>
        <div className='side-menu-button'>
          <span className='side-menu-button-span'>+</span>
          New Decodable Text
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
                        <IconButton aria-label="delete" name={focus} onClick={handleCustomFocusDelete}>
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
                    Add custom focus areas here! Ex. "Short Vowels", "VCe Words"
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
                  <div className='current-items-box'></div>
                </div>
              {/* <form onSubmit={handleSightWordSubmit}>
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
              <div className='accordion-subtitle'> 
                Current Sight Words:
              </div>
              <div className='current-items-box'></div> */}
            </AccordionDetails>
          </Accordion>
        </div>
        <div className='generate-button'>
          <div className='generate-button-text'>
            Generate
          </div>
        </div>
      </div>
      <div></div>
      </section>
    </div>
  );
}

export default App;
