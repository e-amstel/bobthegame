#pragma strict

public var bob: GameObject;
public var newParent: GameObject;

public function SetParent() {
	bob.transform.parent = newParent.transform;
	Debug.Log("Bob's Parent: " + bob.transform.parent.name);
	// Check if the new parent has a parent GameObject.
	if (newParent.transform.parent != null) {
		//Display the name of the grand parent of the player.
		Debug.Log("Player's Grand parent: " + bob.transform.parent.parent.name);
	}
}



function Start () {
	
}

function Update () {



}
