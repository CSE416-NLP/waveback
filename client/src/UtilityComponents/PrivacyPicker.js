import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react';
import "../styles/css/index.css"

const PrivacyPicker = (props) => {
    const onVisibilityChange = props.onVisibilityChange ? props.onVisibilityChange : () => console.log("No callback specified")

    return (
        <div>
            <Button.Group>
                <Dropdown text={props.displayText ? props.displayText : "Visibility"} icon='setting' floating labeled button className='clickButton icon'>
                    <Dropdown.Menu className="dropdownMenu">
                        <Dropdown.Item
                            label={{ color: 'green', empty: true, circular: true }}
                            onClick={() => onVisibilityChange("Public")}
                            text="Public"
                        />
                        <Dropdown.Item
                            label={{ color: 'yellow', empty: true, circular: true }}
                            onClick={() => onVisibilityChange("Followers-Only")}
                            text="Followers-Only"
                        />
                        <Dropdown.Item
                            label={{ color: 'red', empty: true, circular: true }}
                            onClick={() => onVisibilityChange("Private")}
                            text="Private"
                        />
                    </Dropdown.Menu>
                </Dropdown>
            </Button.Group>
        </div>
    );
};
export default PrivacyPicker;