import { Component } from "react";
import { TimerProps } from "../../types/timer.types";
import "./Timer.less";
import Link from "next/link";

export class TimerComponent extends Component<TimerProps> {
    render() {
        return (
            <>
                <h1 className="example">Timer</h1>
                <Link href="/timer">
                    <a>TIMER_PART2</a>
                </Link>
                <p>21:21</p>
            </>
        );
    }
}
export default TimerComponent;