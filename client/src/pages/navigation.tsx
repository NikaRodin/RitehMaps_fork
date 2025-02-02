import Button from "../components/Button";
import Header from "../components/Header";
import DirectionsCard from "../components/DirectionsCard";
import Map from "../components/Map";
import { SubmapProviderImpl } from "../logic/impl/SubmapProviderImpl";
import { MapNodeFilterById } from "../types/roomsearch/MapNodeFilterById";
import { useRouter } from "next/router";
import { NavigationDirections } from "../types/navigation/NavigationDirections";
import { SimpleMapNavigatorMockExample } from "../logic/mock/SimpleMapNavigatorMockExample";
import { NavigationStep } from "../types/navigation/NavigationStep";
import { useState } from "react";



export default function Navigation(){
    
    const router = useRouter()
    const data = router.query
    
    const mapNav = new SimpleMapNavigatorMockExample()

    const navDirections: NavigationDirections = mapNav.findShortestPath(
        data.startNodeId as string,
        new MapNodeFilterById(data.endNodeId as string)
    )
    
    const navSteps: NavigationStep[] = navDirections.steps

    const submap = new SubmapProviderImpl()

    const [currentStep, updateCurrentStep] = useState(0)
    
    const submapImage = submap.getSubmapImage(navSteps[currentStep].nodes[0].submapId)
    const numOfSteps = navSteps.length


    return(
        <>
            <div className="relative w-fill h-screen mx-auto my-0">
                <Header text='Navigation' backPath='/' />
                <div className="mx-auto max-w-sm">
                    <DirectionsCard currentText='Turn right' nextText='Go straight' 
                        currentDirection='/images/up-right.png' nextDirection='/images/up.png' />
                </div>
                <Map layoutImage={submapImage.path} enableDrawNodes width={submapImage.width} 
                    height={submapImage.height} navStep={navSteps[currentStep]}/>  
                <div className="text-center justify-center flex mx-auto mb-4 inset-x-0 absolute bottom-0 my-12">
                    <Button text='Back' 
                        onClick={() => {
                            if(currentStep > 0) {
                                updateCurrentStep(currentStep-1)
                            }
                        }}
                    />
                    <Button text='Update' onClick={() => {router.push('/')}}/>
                    <Button text='Next' 
                        onClick={() => {
                            if(currentStep < numOfSteps-1) {
                                updateCurrentStep(currentStep+1)
                            }
                        }}
                    />
                </div>
            </div>
            
        </>
    );
}


