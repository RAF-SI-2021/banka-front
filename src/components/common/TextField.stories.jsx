import React from "react";

import TextField from "./TextField";

export default {
  title: "Components/TextField",
  component: TextField,
  argTypes: {
    onClick: { action: "clicked" },
  },
};

const Template = (args) => <TextField {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "Primary",
};
