#pragma strict

var cameraFOV: float;
var childCount: float;
var zoomSpeed = 4;
var behaviour = 2;

function Start () {
	//cameraFOV = Camera.main.fieldOfView;
}

function Update () {

    GetComponentInParent();
    //zoom uit op basis van het aantal children
    if (childCount > 5){
       cameraFOV = 35;
    }
    if (childCount > 15){
        cameraFOV = 55;
    }
    if (childCount > 30){
        cameraFOV = 70;
    }
    if (childCount > 50){
        cameraFOV = 100;
    }
    if (childCount > 100){
        cameraFOV = 141;
        transform.position = Vector3(0, 0, -34);

        GetBehaviourInParent ();
        if (behaviour == 2) { 
        endAnimation2();
        }
        if (behaviour == 3) { 
        endAnimation3();
        }
        if (behaviour == 4) { 
        endAnimation4();
        }
        if (behaviour == 5) { 
        endAnimation5();
        }
        if (behaviour == 6) { 
        endAnimation6();
        }

        DetachFromParent();

    }

    Camera.main.fieldOfView = Mathf.Lerp(Camera.main.fieldOfView, cameraFOV, Time.deltaTime*zoomSpeed);

}

function GetComponentInParent () {
        var playerScript = gameObject.GetComponentInParent(NewBehaviourScript1);
        var playerChildren = playerScript.playerChildCount;
        childCount = playerChildren;
    }
function GetBehaviourInParent () {
        var playerScript = gameObject.GetComponentInParent(NewBehaviourScript1);
        var playerBehaviour = playerScript.behaviour;
        behaviour = playerBehaviour;
    }

public function DetachFromParent() {
	// Detaches the transform from its parent.
	transform.parent = null;
	}

	//start eindanimaties
function endAnimation2 (){
	yield WaitForSeconds (5);
    Application.LoadLevel ("eindanimatie2");
}
function endAnimation3 (){
	yield WaitForSeconds (5);
    Application.LoadLevel ("eindanimatie3");
}
function endAnimation4 (){
	yield WaitForSeconds (5);
    Application.LoadLevel ("eindanimatie4");
}
function endAnimation5 (){
	yield WaitForSeconds (5);
    Application.LoadLevel ("eindanimatie5");
}
function endAnimation6 (){
	yield WaitForSeconds (5);
    Application.LoadLevel ("eindanimatie6");
}
