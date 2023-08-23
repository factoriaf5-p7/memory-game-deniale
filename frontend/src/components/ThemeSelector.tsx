import { Dropdown } from 'react-bootstrap';

interface ThemeSelectorProps {
    onChangeTheme: (theme: string) => void;
  }
export const ThemeSelector =  ({ onChangeTheme }:ThemeSelectorProps) => {
    const themes = ['superhero', 'programming']; 
  
    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="theme-dropdown">
          Select Theme
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          {themes.map((theme) => (
            <Dropdown.Item key={theme} onClick={() => onChangeTheme(theme)}>
              {theme}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  };