import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AppBox } from ".";

export default {
    title: 'base/AppBox',
    component: AppBox,
} as ComponentMeta<typeof AppBox>

const Template: ComponentStory<typeof AppBox> = (args) => <AppBox width={500} height={500} {...args}/>

export const White = Template.bind({});
White.args = {
    color: 'white',
}


export const Gray10 = Template.bind({});
Gray10.args = {
    color: 'gray10'
}