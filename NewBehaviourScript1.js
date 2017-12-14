 #pragma strict

 //familiebusiness
	public var player: GameObject;
	var newParent: GameObject;
	var playerChildCount: int; 
//!! behaviours
 	var b = 0;
	var behaviour: int;

 //Inspector Variables
   var playerSpeed : float ; //speed player moves
   var State = 0;
   var animator: Animator;
//boundaries speelveld
   class Roundary
	{
    var xMin : float;
    var xMax : float;
    var yMin : float;
    var yMax : float;
	}
	var boundary : Roundary;
//collide
   var bobCollide: boolean;
   var rb: Rigidbody2D;

//attach object
	var blockTransform : Transform;
 	var playerTransform : Transform;
 	var holdSlot : Transform;

//positie
   	var position: Vector3;
   	var moveDirection = 0;


function Start () {

   rb = GetComponent.<Rigidbody2D>();
   animator = GetComponent("Animator");

      //!!behaviours
    behaviour = Random.Range(3,6);
    UpdateBehaviour ();

   }

function Update () 
   {
       MoveForward(); // Player Movement 
       playerChildCount = transform.childCount;
       UpdateSpeed();   
       UpdateBehaviour ();
   }
   //update de snelheid van de speler op basis van aantal children
function UpdateSpeed (){
	if (playerChildCount > 5) {
		playerSpeed = 3;
	} 
	if (playerChildCount > 15) {
		playerSpeed = 4;
	} 	
	if (playerChildCount > 50) {
		playerSpeed = 6;
	} 	
	if (playerChildCount > 100) {
		playerSpeed = 7;
	} 

}
//update de animatie bij verschillend gedrag
function UpdateBehaviour () {
       if (behaviour == 1) { //standaard
           animator.SetLayerWeight(1,1);

       }
       if (behaviour == 2) { //cool
           animator.SetLayerWeight(2,1);

       }
       if (behaviour == 3) { //irritant
           animator.SetLayerWeight(3,1);

       }
       if (behaviour == 4) { //sad
           animator.SetLayerWeight(4,1);

       }
       if (behaviour == 5) { //happy
           animator.SetLayerWeight(5,1);

       }
       if (behaviour == 6) { //pirate
           animator.SetLayerWeight(6,1);

       }
   }

//colliden met bobs
function OnTriggerEnter2D(other: Collider2D) {
	bobCollide = true;
	Debug.Log("bam");
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


 //familiebusiness
   function SetParent() {
	transform.parent = newParent.transform;
	Debug.Log("Bob's Parent: " + transform.parent.name);
	// Check if the new parent has a parent GameObject.
	if (newParent.transform.parent != null) {
		//Display the name of the grand parent of the player.
		Debug.Log("Player's Grand parent: " + transform.parent.parent.name);
	}
}






 //bewegen en animatiestatus
   function MoveForward()
   {
       if(Input.GetKey("up") && transform.position.y < boundary.yMax)//Press up arrow key to move forward on the Y AXIS
       {
       		moveDirection = 1;	
           transform.Translate(0,playerSpeed * Time.deltaTime,0);
           animator.SetInteger("State", 3);
       }
       if(Input.GetKey("down")&& transform.position.y > boundary.yMin)//Press down arrow key to move forward on the Y AXIS
       {
           moveDirection = 3;	
           transform.Translate(0,-playerSpeed * Time.deltaTime,0);
           animator.SetInteger("State", 1);
       }
       if(Input.GetKey("left")&& transform.position.x > boundary.xMin)//Press left arrow key to move forward on the Y AXIS
       {
			moveDirection = 4;	
           transform.Translate(-playerSpeed * Time.deltaTime,0 ,0);
           animator.SetInteger("State", 4);
       }
       if(Input.GetKey("right")&& transform.position.x < boundary.xMax)//Press right arrow key to move forward on the Y AXIS
       {
       		moveDirection = 2;	
           transform.Translate(playerSpeed * Time.deltaTime,0 ,0);
           animator.SetInteger("State", 2);
       }

   }


  //animatiestatus
   function SetState(value: int){
   	State = value;
   	animator.SetInteger("State", value);
   }

