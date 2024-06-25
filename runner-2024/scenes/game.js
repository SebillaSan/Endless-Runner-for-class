export default class Game extends Phaser.Scene {

    constructor() {
        super({key: "game"});
    }

    init(){

    }

    preload() {
        //Fondo
        this.load.image("background", "images/Background.png");
        //personaje corriendo
        this.load.spritesheet("personaje", "images/XL/Correr/correr.png", {frameWidth: 768 / 3, frameHeight: 768 / 3, startFrame: 1} );

        //personaje saltande 
        this.load.spritesheet("saltar", "images/XL/Saltar/salto.png", {
            frameWidth: 512 / Math.sqrt(4), // Divide el ancho por la raíz cuadrada de la cantidad de frames
            frameHeight: 512 / Math.sqrt(4) // Divide el alto por la raíz cuadrada de la cantidad de frames
        });
        //personaje corriendo
        this.load.image("correr1", "images/XL/Correr/Correr1.png");
        this.load.image("correr2", "images/XL/Correr/Correr2.png");
        this.load.image("correr3", "images/XL/Correr/Correr3.png");
        this.load.image("correr4", "images/XL/Correr/Correr4.png");
        this.load.image("correr5", "images/XL/Correr/Correr5.png");
        this.load.image("correr6", "images/XL/Correr/Correr6.png");
        this.load.image("correr7", "images/XL/Correr/Correr7.png");
        this.load.image("correr8", "images/XL/Correr/Correr8.png");

        //Tiles
        this.load.image("palo", "images/elementos/palo.png");
        this.load.image("piso", "images/elementos/plataforma.png");
        this.load.image("pisito", "images/elementos/pisito.png");





    }

    create() {
        //Fondo
       let background = this.add.image(400, 200, "background");
       
       
       //Crear grupo de plataformas
       this.plataformas = this.physics.add.staticGroup();


       //Crear una pared
       this.plataformas.create(600, 485, "palo").setScale(0.3).refreshBody();

       //crear piso
       this.plataformas.create(80, 550, "piso").setScale(0.2).refreshBody();
       this.plataformas.create(200, 550, "pisito").setScale(0.2).refreshBody();
       this.plataformas.create(320, 550, "piso").setScale(0.2).refreshBody();
       this.plataformas.create(440, 550, "pisito").setScale(0.2).refreshBody();
       this.plataformas.create(560, 550, "piso").setScale(0.2).refreshBody();
       this.plataformas.create(680, 550, "pisito").setScale(0.2).refreshBody();
       this.plataformas.create(800, 550, "piso").setScale(0.2).refreshBody();
      
       //personaje
       
       this.player = this.physics.add.sprite(100, 300, "personaje");
       this.player.setScale(0.4);
       this.player.setCollideWorldBounds(true);
       this.player.setSize(100, 150); // Ajusta el ancho y alto del cuerpo de colisión según tus necesidades
       this.player.setOffset(80, 90); // Ajusta el desplazamiento (offset) del cuerpo de colisión para centrarlo correctamente

       this.anims.create({
        key: "correr",
        frames: this.anims.generateFrameNumbers("personaje", { start: 1, end: 8 }),
        frameRate: 9,
        repeat: -1
    
        })

        this.anims.create({
            key: "salto",
            frames: this.anims.generateFrameNumbers("saltar", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.world.gravity.y = 500;


       // Configurar colisiones entre el personaje y los sprites de suelo
       this.physics.add.collider(this.player, this.plataformas);

       this.cursor = this.input.keyboard.createCursorKeys();

       
      
       

   
    }
    update()
    {
       
        if (this.cursor.right.isDown) {
            this.player.setVelocityX(280);
            this.player.anims.play("correr", true);
            this.player.flipX = false; // Asegura de que el personaje no esté volteado
        } else if (this.cursor.left.isDown) {
            this.player.setVelocityX(-280);
            this.player.anims.play("correr", true);
            this.player.flipX = true; // Voltea el personaje hacia la izquierda
        } else {
            this.player.setVelocityX(0);
            this.player.anims.stop();
            this.player.setFrame(0); // Establece el frame específico cuando el personaje está quieto
        }
        if (this.cursor.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-450);
            this.player.anims.play("salto", true);

        } else if(this.player.body.velocity.y < 0 && !this.player.body.touching.down) { // Si el personaje está en el aire
            
            this.player.anims.play("salto", true);


        }
        
   
           
    }
}    

       

       


       
       
       






    

