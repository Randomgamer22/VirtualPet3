class Food {
    constructor(){    
        this.foodStock = 20;
        this.lastFed = null;
        this.image = loadImage("images/Milk.png")
    }

    getFoodStock() {
        var foodStockRef = database.ref('Food')
        foodStockRef.on('value', (data) => {
            this.foodStock = data.val();
        })
    }

    updateFoodStock(data) {
        database.ref('/').update({
            Food: data
        })
    }

    deductFood() {
        updateFoodStock(this.foodStock - 1);
        this.foodStock--;
    }

    display() {
        var x = 100;
        var y = 200;

        imageMode(CENTER);

        if(this.foodStock!=0) {
            for(var i=0; i<this.foodStock; i++) {
                x+=30;
                if(i%10 === 0){
                    x=100;
                    y+=50;
                } 
                image(this.image, x, y, 50, 50);
            }
        }
    }

}