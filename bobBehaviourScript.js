 #pragma strict

 //familiebizz
	var newParent: GameObject;

//!! behaviours
	var behaviour;
	var parentBehaviour;
	var playerBehaviour;
 //Inspector Variables
   var playerSpeed : float ; //speed player moves
   var State = 0;
   var animator: Animator;
   var moveDirection = 0;
   var groep = 1; 
//boundaries speelveld
   class Boundary
{
    var xMin : float;
    var xMax : float;
    var yMin : float;
    var yMax : float;
}
var boundary : Boundary;

//spawn waarden
    var xSpawnMin : float;
    var xSpawnMax : float;
    var ySpawnMin : float;
    var ySpawnMax : float;
     
//follow
	var range : float;


//collision
   var bobCollide: boolean; // collision meten
   var collided = false;
   var rb: Rigidbody2D;
   var angularVelocity: float;
//positie spawn
   var position: Vector3;
   transform.position = Vector3(Random.Range(xSpawnMin,xSpawnMax), Random.Range(ySpawnMin,ySpawnMax), 0);

function Start () {
   rb = GetComponent.<Rigidbody2D>();
   rb.angularVelocity = 0;
   animator = GetComponent("Animator");

      //behaviours
    behaviour = Random.Range(1,6);
    Debug.Log(behaviour);
    UpdateBehaviour (); //

   }

function Update () 
   {
   Collide ();
   	if(transform.parent!=null){
   			ParentMove();
      }
	if (transform.parent == null){
	       Move(); // Player Movement 
	       }        

	GetComponentInParent();
	UpdateBehaviour (); //

   }

//update animatie naar juiste behaviour
function UpdateBehaviour () {
       if (behaviour == 1) { //standaard
           animator.SetLayerWeight(1,1);
           playerSpeed = 1;
       }
       if (behaviour == 2) { //cool
           animator.SetLayerWeight(2,1);
           playerSpeed = 0.5;
       }
       if (behaviour == 3) { //irritant
           animator.SetLayerWeight(3,1);
           playerSpeed = 3;
       }
       if (behaviour == 4) { //sad
           animator.SetLayerWeight(4,1);
           playerSpeed = 0.4;
       }
       if (behaviour == 5) { //happy
           animator.SetLayerWeight(5,1);
           playerSpeed = 2;
       }
       if (behaviour == 6) { //pirate
           animator.SetLayerWeight(6,1);
           playerSpeed = 0.3;
       }
   }
//reset de layers
function LayerWeightReset(){
	    animator.SetLayerWeight(1,0);
    	animator.SetLayerWeight(2,0);
    	animator.SetLayerWeight(3,0);
    	animator.SetLayerWeight(4,0);
    	animator.SetLayerWeight(5,0);
    	animator.SetLayerWeight(6,0);
	}


//animatiestate
function SetState(value: int){ 
   		State = value;
   		animator.SetInteger("State", value);
   }

//colliden met andere objecten
function OnTriggerEnter2D(other: Collider2D) {

   		if (other.gameObject.tag == "Player"){
   		 	DetachFromParent();
   		 }

   		if (groep <3){
			bobCollide = true;
		}

		LayerWeightReset();
		UpdateBehaviour ();

		var parentName = other.gameObject.name;
		newParent =  GameObject.Find(parentName);
		SetParent();
		GetComponentInParent();

	}



//berekenen richting
function Direction (){
   		moveDirection = Random.Range(1,5);
   }

   if(transform.parent==null){
   InvokeRepeating("Direction", .01, 1.0);
   }


 //beweging en animatiestate  
function Move()
   {
       if(moveDirection == 1 && transform.position.y < boundary.yMax)//up arrow key to move forward on the Y AXIS
       {
           transform.Translate(0,playerSpeed * Time.deltaTime,0,  Space.Self);
           animator.SetInteger("State", 3);
       }
        if(moveDirection == 3 && transform.position.y > boundary.yMin)//Press down arrow key to move forward on the Y AXIS
       {
           transform.Translate(0,-playerSpeed * Time.deltaTime,0, Space.Self);
           animator.SetInteger("State", 1);
       }
       if(moveDirection == 4 && transform.position.x > boundary.xMin)//Press left arrow key to move forward on the Y AXIS
       {
           transform.Translate(-playerSpeed * Time.deltaTime,0 ,0, Space.Self);
                      animator.SetInteger("State", 4);
       }
       if(moveDirection == 2&& transform.position.x < boundary.xMax)//Press right arrow key to move forward on the Y AXIS
       {
           transform.Translate(playerSpeed * Time.deltaTime,0 ,0, Space.Self);
                      animator.SetInteger("State", 2);
		}
	}
	//beweging van de parent
function ParentMove()
   {
		GetComponentInParent();
       if(moveDirection == 1 )//up arrow key to move forward on the Y AXIS
       {
           animator.SetInteger("State", 3);
       }


        if(moveDirection == 3 )//Press down arrow key to move forward on the Y AXIS
       {
           animator.SetInteger("State", 1);

       }

       if(moveDirection == 4)//Press left arrow key to move forward on the Y AXIS
       {
          animator.SetInteger("State", 4);

       }

       if(moveDirection == 2)//Press right arrow key to move forward on the Y AXIS
       {
           animator.SetInteger("State", 2);

		}
	}

// collidende characters
function Collide() {
   if (bobCollide == true ){
       	collided = true;
		//playerSpeed = 0;
		groep++;
		bobCollide = false;

       }
       if (collided == true){
      // animator.SetInteger("State", 0);

       }
       if (groep == 2){
       //playerSpeed = 1;
       groep = 0;
       collided = false;
       }

       }


//familiebusiness
public function SetParent() {
	transform.parent = newParent.transform;
//	Debug.Log("Bob's Parent: " + transform.parent.name);
	// Check if the new parent has a parent GameObject.
	if (transform.parent.parent != null && transform.parent.name != "Player") {
	transform.parent = transform.parent.parent;
		//Display the name of the grand parent of the player.
//		Debug.Log("Player's Grand parent: " + transform.parent.parent.name);
		if (transform.parent.parent != null && transform.parent.name != "Player") {
		transform.parent = transform.parent.parent;
		}
	}
	}

public function DetachFromParent() {
	// Detaches the transform from its parent.
	transform.parent = null;
	}

public function GetComponentInParent () {
	if (transform.parent.name == "Player") {
	   	var playerScript = newParent.gameObject.GetComponentInParent(NewBehaviourScript1);
	   	var playerDirection = playerScript.moveDirection;
   		moveDirection = playerDirection;
   		playerBehaviour = playerScript.behaviour;
   		behaviour = playerBehaviour;
		}
	else {
   		var parentScript = newParent.gameObject.GetComponentInParent(bobBehaviourScript);
   		var parentDirection = parentScript.moveDirection;
   		moveDirection = parentDirection;
   		parentBehaviour = parentScript.behaviour;
   		behaviour = parentBehaviour;
   		}

	}


