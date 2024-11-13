import React, { useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap';
import { Navbar } from '../../components/sub-comp';
import Footer from '../../components/Footer';
import { format, addDays, subDays, startOfWeek, endOfWeek } from "date-fns";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import salmon from '../../img/Food-bg.jpg';

function MealPlanner() {
    const [currDate, setCurrDate] = useState(new Date());
    const startCurrWeek = startOfWeek(currDate, { weekStartsOn: 0 });
    const endCurrWeek = endOfWeek(currDate, { weekStartsOn: 0 });
    const formattedRange = `${format(startCurrWeek, "MMMM d")} - ${format(endCurrWeek, "MMMM d, yyyy")}`;

    const startDate = new Date(startCurrWeek);
    const [renderWeekDates, setRenderWeekDates] = useState(
        // generateWeekDates(startDate)
        getDaysOfWeek(startCurrWeek, endCurrWeek)
    );

    const goToNextWeek = () => {
        setCurrDate(addDays(currDate, 7));
    }

    const goToPreviousWeek = () => {
        setCurrDate(subDays(currDate, 7));
    }

    const handleDateChange = (date: any) => {
        setCurrDate(date);
        setRenderWeekDates(date);
    }

    // function generateWeekDates(startDate: Date): Date[] {
    //     let dates: Date[] = [];
    //     for (let i = 0; i < 7; i++) {
    //         let date = new Date(startDate);
    //         date.setDate(date.getDate() + i);
    //         dates.push(date);
    //     }

    //     return dates;
    // }

    function getDaysOfWeek(start: Date, end: Date) {
        const days = [];
        let current = start;
        while (current <= end) {
            days.push(format(current, 'EEEE')); // e.g., "Sunday, 1 October"
            current = addDays(current, 1);
        }
        return days;
    };

    const daysOfWeek = getDaysOfWeek(startCurrWeek, endCurrWeek);
    console.log(renderWeekDates);

    return (
        <div>
            <Navbar />

            <div className="breadcrumb-section" style={{ backgroundImage: `url(${salmon})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <h1>Meal Planner</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="single-product mt-100 mb150">
                <div className="container">
                    {/* Weekly Range button */}
                    <div className="row pb-50">
                        <div className="col-md-12">
                            <div className="product-filters">
                                <ul>
                                    <div className="date-navigator-container">
                                        <ButtonGroup className="date-navigator-pill cursor-pointer">
                                            <Button variant="light" className="date-nav-button" onClick={goToNextWeek}>
                                                <i className="fa fa-arrow-left"></i>
                                            </Button>

                                            <DatePicker
                                                selected={currDate}
                                                onChange={handleDateChange}
                                                customInput={
                                                    <Button variant="outline-secondary" className="div-formatted-range">
                                                        {formattedRange}
                                                    </Button>
                                                }
                                                calendarStartDay={0}
                                            />

                                            <Button variant="light" className="date-nav-button" onClick={goToPreviousWeek}>
                                                <i className="fa fa-arrow-right"></i>
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Days Row */}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="product-filters">
                                <ul>
                                    {daysOfWeek.map((date) => (
                                        <button className="dates-button">
                                            {date.toLocaleString()}
                                        </button>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="single-product mt-50 mb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="checkout-accordion-wrap">
                                <div className="accordion" id="accordionExample">

                                    {/* BREAKFAST SECTION */}
                                    <div className="card single-accordion">
                                        <div className="card-header" id="headingOne">
                                            <h5 className="mb-0">
                                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                    Breakfast Meals
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                            <div className="card-body">
                                                <div className="shipping-address-form">
                                                    <p>List of you meals here...</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* LUNCH SECTION */}
                                    <div className="card single-accordion">
                                        <div className="card-header" id="headingTwo">
                                            <h5 className="mb-0">
                                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                    Lunch Meals
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                            <div className="card-body">
                                                <div className="shipping-address-form">
                                                    <p>List of you meals here...</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* DINNER SECTION */}
                                    <div className="card single-accordion">
                                        <div className="card-header" id="headingThree">
                                            <h5 className="mb-0">
                                                <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    Dinner Meals
                                                </button>
                                            </h5>
                                        </div>
                                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                            <div className="card-body">
                                                <div className="shipping-address-form">
                                                    <p>List of you meals here...</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default MealPlanner