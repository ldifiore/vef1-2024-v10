import Slider from '@mui/material/Slider';

export default function VerticalAccessibleSlider() {
  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
    }
  }

  return (
      <Slider  
        orientation="vertical"
        defaultValue={30}
        aria-label="Temperature"
        onKeyDown={preventHorizontalKeyboardNavigation}
      />
  );
}