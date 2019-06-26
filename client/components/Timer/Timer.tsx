import { Component } from "react";
import { TimerProps } from "../../types/timer.types";
import "./Timer.css";

import "tabler-react/dist/Tabler.css";

import { Card, Button } from "tabler-react";

export class TimerComponent extends Component<TimerProps> {
    render() {
        return (
            <>
                <h1>Next.js App written in typscript, jest, tabler-react and apollo client</h1>
                <Card>
                    <Card.Header>
                        <Card.Title>Card Title</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Button color="primary">A Button</Button>
                        <Button link>Link</Button>
                    </Card.Body>
                </Card>
            </>
        );
    }
}
export default TimerComponent;