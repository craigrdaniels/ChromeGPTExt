// @ts-nocheck
import { xml2js } from 'xml-js'

type AudigramValues = {
  freq: string
  level: string
}

type SpeechAudiogramValues = {
  level: string
  scorePct: string
}

type ImpedanceValues = {
  testPressure: string
  testVolume: string
  testCompliance: string
}


type Audiogram = {
  date?: string
  stimulus: string
  masked: boolean
  values: AudigramValues[]
}

type SpeechAudiogram = {
  date?: string
  stimulus: string
  values: SpeechAudiogramValues[]
}

type Impedance = {
  ear: string
  date?: string
  values: ImpedanceValues
}

export type JSONData = { 
  audiogram: Audiogram[]
  speechAudiogram: SpeechAudiogram[],
  impedance: Impedance[]
}



const ReadXMLData = (inputFile: string) => {

  const options = { ignoreComment: true, alwaysChildren: true, nativeType: true };

  const result = xml2js(inputFile, options);

  // extract audiogram data
  let audiogram: Audiogram[] = []
  let speechAudiogram: SpeechAudiogram[] = []

  result.elements[0].elements[0].elements[0].elements // Actions array
    .find(el => el.name === "pt:Actions") // Find the Action element for the audiogram
    .elements.filter(el => el.name === "pt:Action")
    .forEach(actionElement => {
      actionElement.elements.filter(el => el.name === "pt:PublicData")
        .forEach(publicDataElement => {
          publicDataElement.elements.filter(el => el.name === "HIMSAAudiometricStandard")
            .forEach(audiogramData => {


              audiogramData.elements.forEach(audiogramElement => {
                const date = actionElement.elements.find(el => el.name === "pt:ActionDate").elements[0].text

                // console.log(JSON.stringify(audiogramElement, null, 2))
                if (audiogramElement.name === "ToneThresholdAudiogram") {
                  const stimulus = audiogramElement.elements.find(el => el.name === "AudMeasurementConditions")
                    .elements.find(el => el.name === "StimulusSignalOutput").elements[0].text

                  const masked = audiogramElement.elements.find(el => el.name === "AudMeasurementConditions")
                    .elements.find(el => el.name === "MaskingSignalType").elements[0].text !== "NoSignalApplied"

                  const values: AudigramValues[] = []


                  audiogramElement.elements.filter(el => el.name === "TonePoints")
                    .forEach(tonePoint => {
                      const freq = tonePoint.elements.find(el => el.name === "StimulusFrequency").elements[0].text
                      const level = tonePoint.elements.find(el => el.name === "StimulusLevel").elements[0].text
                      values.push({ freq, level })
                    })


                  audiogram.push({ date, stimulus, masked, values })

                  // Extract speech audiogram data
                } else if (audiogramElement.name === "SpeechDiscriminationAudiogram") {

                  const stimulus = audiogramElement.elements.find(el => el.name === "AudMeasurementConditions")
                    .elements.find(el => el.name === "StimulusSignalOutput").elements[0].text

                  const values: SpeechAudiogramValues[] = []

                  audiogramElement.elements.filter(el => el.name === "SpeechDiscriminationPoints")
                    .forEach(tonePoint => {
                      const level = tonePoint.elements.find(el => el.name === "StimulusLevel").elements[0].text
                      const scorePct = tonePoint.elements.find(el => el.name === "ScorePercent").elements[0].text
                      values.push({ level, scorePct })
                    })

                  speechAudiogram.push({ date, stimulus, values })
                }
              })
              // audiogram.push(speechData )
            })
        })
    })


  // extract impedance data

  let impedance: Impedance[] = []

  result.elements[0].elements[0].elements[0].elements
    .find(el => el.name === "pt:Actions")
    .elements.filter(el => el.name === "pt:Action")
    .forEach(actionElement => {
      const ear = actionElement.elements.find(el => el.name === "pt:Description").elements[0].text.split(" ").at(-1)

      actionElement.elements.find(el => el.name === "pt:PublicData")
        .elements.filter(el => el.name === "AcousticImpedanceCompleteMeasurement")
        .forEach(measurement => {
          measurement.elements.filter(el => el.name === "TympanogramTest")
            .forEach(test => {
              const date = actionElement.elements.find(el => el.name === "pt:ActionDate").elements[0].text

              const testCompliance = test.elements.find(el => el.name === "MaximumCompliance").elements[0].elements[0].elements[0].text
              const testVolume = test.elements.find(el => el.name === "CanalVolume").elements[0].elements[0].elements[0].text
              const testPressure = test.elements.find(el => el.name === "Pressure").elements[0].text

              impedance.push({ ear: ear, date: date, values: { testPressure, testVolume, testCompliance } })
            })
        })
    })

  // get only the most recent data
  const maxDate = audiogram.sort((a, b) => a.date - b.date)[audiogram.length - 1].date


  audiogram = audiogram.filter(el => el.date.split("T")[0] === maxDate.split("T")[0])
  speechAudiogram = speechAudiogram.filter(el => el.date.split("T")[0] === maxDate.split("T")[0])
  impedance = impedance.filter(el => el.date.split("T")[0] === maxDate.split("T")[0])


  // trim date from json data
  impedance.forEach(el => {
    delete el.date
  })
  audiogram.forEach(el => {
    delete el.date
  })
  speechAudiogram.forEach(el => {
    delete el.date
  })


  const jsonData: JSONData = { audiogram, impedance, speechAudiogram }

  return jsonData
}

export default ReadXMLData
