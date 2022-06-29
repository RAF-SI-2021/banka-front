import React from "react";

import Autocomplete from "./Autocomplete";

export default {
    title: "Common/Autocomplete",
    component: Autocomplete,
};

const Template = (args) => <Autocomplete {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: "Label",
    items: [
        'Test1',
        'Test2',
        'Lorep',
        'Ipsum',
    ]
};
