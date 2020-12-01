import React from 'react';
import { Button, Dropdown } from 'semantic-ui-react';
import "../styles/css/index.css"

const PrivacyPicker = (props) => {
    const onVisibilityChange = props.onVisibilityChange ? props.onVisibilityChange : () => console.log("No callback specified")

    return (
        <div className="dropdownChangePrivacy">
            <Button.Group>
                <Dropdown text={props.displayText ? props.displayText : "Visibility"} icon='setting' floating labeled button className='clickButton icon'>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            label={{ color: 'var(--buttonColor)', empty: true, circular: true }}
                            onClick={() => onVisibilityChange("Public")}
                            text="Public"
                        />
                        <Dropdown.Item
                            label={{ color: 'var(--primary)', empty: true, circular: true }}
                            onClick={() => onVisibilityChange("Followers-Only")}
                            text="Followers-Only"
                        />
                        <Dropdown.Item
                            label={{ color: 'var(--accent)', empty: true, circular: true }}
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