class Controls{
    constructor(type){
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        switch(type){
            case "KEYS":
                this.#addkeyboardListeners();
                break;
            case "DUMMY":
                this.forward = true;
                break;
        }
     

       
    }

    #addkeyboardListeners(){
    

           document.addEventListener('keydown', e=> {
            switch(e.key){
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
        }, false);

        document.addEventListener('keyup', e=> {
            switch(e.key){
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
            }
        }, false);
    }
}