'use client'

import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import 'survey-core/defaultV2.css'
import { json } from '../../data/survey_json.js'
import { useEffect, useState } from 'react'
  
export default function SurveyComponent() {
  let [model, setModel] = useState<Model | undefined>();

  const SSR = typeof window === 'undefined'

  useEffect(() => {
    const newModel = new Model(json);
    setModel(newModel);   
  }, [])

  return (
    <>
    {!SSR && model && (<div style={{ height: "90vh", width: "100%" }}>
    <Survey model={model}/>
  </div>)
  }
    </>
  );
}
