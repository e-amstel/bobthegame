#pragma strict

var childCount: float;
var eindState;

var animator: Animator;

function Start () {
	   transform.position = Vector3(0, 0, 5);
	   animator = GetComponent("Animator");
}

function Update () {
	transform.position = Vector3(0, 0, 5);

	GetComponentInParent ();

	if (childCount > 100){
			transform.position = Vector3(0,0,(-5));
			GetBehaviourInParent ();
			Debug.Log("it workkkk");
			animator.SetInteger("eindState", eindState);
    }
}


function GetComponentInParent () {
        var playerScript = gameObject.GetComponentInParent(NewBehaviourScript1);
        var playerChildren = playerScript.playerChildCount;
        childCount = playerChildren;
	}
function GetBehaviourInParent () {
        var playerScript = gameObject.GetComponentInParent(NewBehaviourScript1);
        var playerBehaviour = playerScript.behaviour;
        eindState = playerBehaviour;
    }
