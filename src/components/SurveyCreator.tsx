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
  const SSR = typeof window === 'undefined';

  const [creator, setCreator] = useState<SurveyCreator>(() => {
    const newCreator = new SurveyCreator(props.options || defaultCreatorOptions);
    newCreator.saveSurveyFunc = (no: number, callback: (num: number, status: boolean) => void) => {
      console.log("Saving survey");
      console.log(JSON.stringify(newCreator?.JSON)); // Use the latest reference
      callback(no, true);
    };
    editorLocalization.currentLocale = 'nl';
    newCreator.JSON = props.json || defaultJson;
    return newCreator;
  });

  useEffect(() => {
    // Update creator if necessary
    if (creator) {
      creator.JSON = props.json || defaultJson;
    }
  }, [props.json, creator]);

  return (
    <>
      {!SSR && creator && (
        <div style={{ height: "90vh", width: "100%" }}>
          <SurveyCreatorComponent creator={creator} />
        </div>
      )}
    </>
  );
}
