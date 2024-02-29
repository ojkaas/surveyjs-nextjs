'use client'

import { useEffect, useState } from "react";
import { ICreatorOptions, editorLocalization } from "survey-creator-core";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import "survey-core/defaultV2.css";
import "survey-creator-core/survey-creator-core.min.css";
import "survey-creator-core/i18n/dutch";
import { json as defaultJson } from "../../data/survey_json";

const defaultCreatorOptions: ICreatorOptions = {
  showLogicTab: true,
  isAutoSave: true,
  showTranslationTab: false
};


export default function SurveyCreatorWidget(props: { json?: Object, options?: ICreatorOptions }) {
  let [creator, setCreator] = useState<SurveyCreator>();

  const SSR = typeof window === 'undefined'
  
  useEffect(() => {
    const newCreator = new SurveyCreator(props.options || defaultCreatorOptions);
    newCreator.saveSurveyFunc = (no: number, callback: (num: number, status: boolean) => void) => {
      console.log("Saving survey")
      console.log(JSON.stringify(creator?.JSON));
      callback(no, true);
    };
    editorLocalization.currentLocale = 'nl'
    newCreator.JSON = props.json || defaultJson;
    //creator.locale = 'nl'
    setCreator(newCreator);   
  }, [props.json])
  
  return (
    <>
    {!SSR && creator && (<div style={{ height: "90vh", width: "100%" }}>
      <SurveyCreatorComponent creator={creator} />
    </div>)
    }
    </>
  );
}
