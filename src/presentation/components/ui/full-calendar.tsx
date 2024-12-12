"use client"

import { ReactNode, useEffect, useRef, useState } from "react"
import { DatesSetArg, EventContentArg } from "@fullcalendar/core"
import frLocale from "@fullcalendar/core/locales/fr"
import dayGridPlugin from "@fullcalendar/daygrid" // a plugin!

import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

import "./Calendar.css"

import { ISeanceEvent } from "../../types/seances.type"

type TCustomButton = {
    [key: string]: {
        text: string
        click?: () => void
        hint?: string
        icon?: ReactNode
    }
}

type Props = {
    events: ISeanceEvent[]
    customButtons: TCustomButton
    centerButtons?: TCustomButton
    handleDatesSet(arg: DatesSetArg): void
    header?: ReactNode
}

const CustomEventContent = ({ event }: EventContentArg) => {
    const { title, extendedProps } = event
    const { start, end } =
        event.start && event.end
            ? {
                  start: event.start.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                  }),
                  end: event.end.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                  }),
              }
            : { start: "", end: "" }

    return (
        <div className="custom-event-content">
            <div className="event-time">
                {start} - {end}
            </div>
            <div className="event-title">{title}</div>
            {extendedProps.description && (
                <div className="event-description">
                    {extendedProps.description}
                </div>
            )}
        </div>
    )
}

export default function Calendar({
    events,
    customButtons,
    centerButtons = {},
    handleDatesSet,
    header,
}: Props) {
    const calendarWrapperRef = useRef<HTMLDivElement>(null)
    const calendarRef = useRef<FullCalendar>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isPrinting, setIsPrinting] = useState(false)

    const handleDownload = () => {
        setIsLoading(true)
        setIsPrinting(true)
    }

    const updatedCustomButtons = {
        ...customButtons,
        downloadButton: {
            text: "Télécharger PDF",
            click: handleDownload,
            hint: "Télécharger au format PDF",
            icon: "pi pi pi-download font-['primeicons'!important]",
        },
    }

    const savePdfWithTimestamp = (pdf: jsPDF) => {
        const now = new Date()
        const timestamp = now.toISOString().replace(/[:.]/g, "-").slice(0, -5) // Format: YYYY-MM-DDTHH-mm
        const filename = `EDT_${timestamp}.pdf`
        pdf.save(filename)
    }

    useEffect(() => {
        if (isPrinting && !!calendarWrapperRef.current) {
            const calendarElement = calendarWrapperRef.current
            html2canvas(calendarElement).then((canvas) => {
                const imgData = canvas.toDataURL("image/png")
                const pdf = new jsPDF({
                    orientation: "landscape",
                    unit: "mm",
                    format: "a4",
                })
                const imgProps = pdf.getImageProperties(imgData)
                const pdfWidth = pdf.internal.pageSize.getWidth()
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
                pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
                savePdfWithTimestamp(pdf)
                setTimeout(() => {
                    setIsPrinting(false)
                    setIsLoading(false)
                }, 3000)
            })
        }

        return () => {}
    }, [isPrinting, calendarWrapperRef.current])

    return (
        <>
            <div ref={calendarWrapperRef} className="CalendarWrapper relative">
                {/* {isLoading && (
                    <>
                        <BlurredLoading />
                    </>
                )} */}
                {isPrinting && header}
                <FullCalendar
                    datesSet={handleDatesSet}
                    ref={calendarRef}
                    locale={frLocale}
                    // resourceGroupLaneClassNames={
                    //     "max-h-[calc(100vh_-_57px)] border border-red-600"
                    // }
                    dayCellClassNames={"space-y-4"}
                    plugins={[
                        timeGridPlugin,
                        dayGridPlugin,
                        // interactionPlugin,
                        // resourceTimelinePlugin,
                    ]}
                    customButtons={updatedCustomButtons}
                    headerToolbar={
                        isPrinting
                            ? false
                            : {
                                  right: Object.keys(updatedCustomButtons).join(
                                      ","
                                  ),
                                  // center: Object.keys(updatedCenterButtons).join(" ") + " title",
                                  center: "title",
                                  left: "prev,next today",
                              }
                    }
                    initialView="timeGridWeek"
                    nowIndicator={true}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    // resources={[
                    //     { id: "a", title: "Auditorium A" },
                    //     { id: "b", title: "Auditorium B", eventColor: "green" },
                    //     { id: "c", title: "Auditorium C", eventColor: "orange" },
                    // ]}
                    events={events}
                    hiddenDays={[0]}
                    allDaySlot={false}
                    // startParam="06:00:00"
                    // endParam="19:00:00"
                    // businessHours={{
                    //     start: "07:00:00",
                    //     end: "16:30:00",
                    // }}
                    slotMinTime="06:00:00"
                    slotMaxTime="19:00:00"
                    eventContent={CustomEventContent}
                />
            </div>
        </>
    )
}
