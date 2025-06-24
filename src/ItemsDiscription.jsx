import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import SingleIngrediant from "./SingleIngrediant";
import SingleEquipment from "./SingleEquipment";
import VoiceControl from "./VoiceControl";
function ItemsDiscription() {
  const [recipe, setRecipe] = useState(null);
  const [stepNum, setStepNum] = useState(0);
  const { id } = useParams();
  const API_KEY = "909ef4efb2564d5ab4bbe227584cba27";

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: {
              apiKey: API_KEY,
            },
          }
        );

        setRecipe(response.data);

        setStepNum(0);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };
    fetchRecipe();
  }, [id]);
  useEffect(() => {
    if (
      recipe &&
      recipe.analyzedInstructions?.[0]?.steps?.[stepNum]?.step &&
      "speechSynthesis" in window
    ) {
      const text = recipe.analyzedInstructions[0].steps[stepNum].step;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    }
  }, [stepNum, recipe]);

  const handleNextStep = () => {
    const steps = recipe?.analyzedInstructions?.[0]?.steps || [];

    if (stepNum < steps.length - 1) {
      setStepNum(stepNum + 1);
    }
  };
  const repeatStep = () => {
  if (
    recipe &&
    recipe.analyzedInstructions?.[0]?.steps?.[stepNum]?.step &&
    "speechSynthesis" in window
  ) {
    const text = recipe.analyzedInstructions[0].steps[stepNum].step;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.cancel(); // Stop any current speech
    speechSynthesis.speak(utterance);
  }
};


  const steps = recipe?.analyzedInstructions?.[0]?.steps || [];
  const stepsLength = steps.length;

  const handlePrevStep = () => {
    if (stepNum != 0) {
      setStepNum(stepNum - 1);
    } else setStepNum(0);
  };
  return (
    <>
    <Navbar/>
      <div>
        {recipe && recipe.analyzedInstructions?.[0]?.steps?.length > 0 && (
          <div>
            <div className="flex flex-col justify-center items-center bg-cyan-100 p-5">
              <h3 className="text-4xl text-black flex items-center justify-center p-4">
                {recipe.title}
              </h3>
              <img
                src={recipe.image}
                alt={recipe.title}
                width={300}
                className='"mx-auto rounded-xl border border-color-black shadow-lg w-96'
              />
            </div>
            <div className="m-2">
              <b className="text-3xl">Summary:</b>
              <p>{recipe.summary.replace(/<[^>]+>/g, "")}</p>
            </div>
            <div className="flex">
              <div className="w-150">
                <div className=" w-150  my-5 p-3">
                  <h1 className=" text-3xl bold-2xl">
                    <b>Instructions:</b>
                  </h1>
                  <div className="w-140 h-40">
                    <h4 style={{ marginTop: "1rem" }}>
                      <b>Step {stepNum + 1}:</b>
                    </h4>
                    <p>{recipe.analyzedInstructions[0].steps[stepNum].step}</p>
                  </div>
                </div>

                <div className="" style={{ marginTop: "1rem" }}>
                  {stepNum != stepsLength - 1 && (
                    <button
                      onClick={handleNextStep}
                      className="border border-red-500 text-red-500  mr-5 rounded-xl w-20 py-2 text-xl cursor-pointer"
                    >
                      Next
                    </button>
                  )}
                  {stepNum != 0 && (
                    <button
                      className="border border-green-500 rounded-xl w-25 py-2 text-xl text-green-500 p-2 cursor-pointer"
                      onClick={handlePrevStep}
                    >
                      Previous
                    </button>
                  )}
                </div>
                <div className="mt-10">
      <VoiceControl handlePrevStep={handlePrevStep} handleNextStep={handleNextStep} handleRepeatStep={repeatStep}/>
    </div>
              </div>
              <div className="w-200">
                <b className="text-3xl block mb-2 text-center">Ingredients</b>
                {recipe.analyzedInstructions[0].steps[stepNum].ingredients
                  .length === 0 ? (
                  <p className="text-center italic text-gray-500 h-60">
                    No Ingredients...
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2 justify-center items-start p-2 h-60 overflow-y-auto">
                    {recipe.analyzedInstructions[0].steps[
                      stepNum
                    ].ingredients.map((content, index) => (
                      <SingleIngrediant key={index} content={content} />
                    ))}
                  </div>
                )}

                <b className="text-3xl block mt-4 mb-2 text-center">
                  Equipments
                </b>
                {recipe.analyzedInstructions[0].steps[stepNum].equipment
                  .length === 0 ? (
                  <p className="text-center italic text-gray-500 h-60">
                    No Equipment...
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2 justify-center items-start p-2 h-60 overflow-y-auto">
                    {recipe.analyzedInstructions[0].steps[
                      stepNum
                    ].equipment.map((content, index) => (
                      <SingleEquipment key={index} content={content} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
      </div>
    </>
  );
}

export default ItemsDiscription;
