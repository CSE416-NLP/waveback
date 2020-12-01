import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react';
import "../styles/css/index.css"
import { COLOR_SCHEMES } from '../styles/ColorSchemes'

const ThemePicker = (props) => {
    const changeStyle = (theme) => {
        let style = COLOR_SCHEMES[theme];
        document.documentElement.style.setProperty("--primary", style.primary);
        document.documentElement.style.setProperty("--secondary", style.secondary);
        document.documentElement.style.setProperty("--accent", style.accent);
        document.documentElement.style.setProperty("--background", style.background);
        document.documentElement.style.setProperty("--hue", style.hue);
        document.documentElement.style.setProperty("--buttonColor", style.buttonColor);

        if (props.saveColorTheme) {
            props.saveColorTheme(theme);
        }
    }

    return (
        <div className="dropdownChangeTheme">
            <Button.Group>
                <Dropdown text='Theme' icon='theme' floating labeled button className='clickButton icon'>
                    <Dropdown.Menu className="dropdownMenu">
                        <Dropdown.Item
                            label={{ color: 'teal', empty: true, circular: true }}
                            onClick={() => changeStyle("Modern")}
                            text="Modern"
                        />
                        <Dropdown.Item
                            label={{ color: 'orange', empty: true, circular: true }}
                            onClick={() => changeStyle("Old-School")}
                            text="Old-School"
                        />
                        <Dropdown.Item
                            label={{ color: 'purple', empty: true, circular: true }}
                            onClick={() => changeStyle("Retro")}
                            text="Retro"
                        />
                    </Dropdown.Menu>
                </Dropdown>
            </Button.Group>
        </div>
    );
};
export default ThemePicker;