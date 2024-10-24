function SpawnFood () {
    RandomSprite = sprites.create(img`
        . . . . . . . c d . . . . . . . 
        . . . . . . . c d . . . . . . . 
        . . . . . . . c d . . . . . . . 
        . . . . . . . c b . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . c 7 . . . . . . . 
        . . . . . . . f f . . . . . . . 
        . . . . . . . 8 7 . . . . . . . 
        . . . . . . 8 8 5 6 . . . . . . 
        . . . . . . 8 7 5 6 . . . . . . 
        . . . . . c c c 6 6 6 . . . . . 
        . . . . 8 8 7 7 7 5 6 6 . . . . 
        . . 8 f f f c c 6 6 f f 6 6 . . 
        . 8 8 8 8 6 6 7 7 7 7 5 7 6 6 . 
        8 8 8 8 8 8 6 6 7 7 7 5 7 7 6 6 
        8 8 8 8 8 8 6 6 7 7 7 7 5 7 6 6 
        `, SpriteKind.Food)
    currentFood += 1
    HeroSprite.sayText(currentFood)
    RandomSprite.setPosition(randint(0, 140), randint(0, 100))
    RandomSprite.setVelocity(EnemyVelocity, EnemyVelocity)
    RandomSprite.setStayInScreen(true)
    RandomSprite.setBounceOnWall(true)
}
function setDifficulty () {
    if (difficulty == 0) {
        MaxFood = 5
        EnemyVelocity = 25
        MaxEnemyVelocity = 50
    } else if (difficulty == 1) {
        MaxFood = 3
        EnemyVelocity = 50
        MaxEnemyVelocity = 100
    } else if (difficulty == 2) {
        MaxFood = 2
        EnemyVelocity = 75
        MaxEnemyVelocity = 150
    } else if (!(difficulty <= 0) && !(difficulty >= 0)) {
        game.splash("Invalid")
        game.reset()
    }
}
info.onLifeZero(function () {
    for (let index = 0; index <= HighScores.length - 1; index++) {
        if (info.score() >= HighScores[index]) {
            HighScores.insertAt(index, info.score())
            HighScores.pop()
            HighScoreNames.insertAt(index, game.askForString(""))
            HighScoreNames.pop()
        }
        break;
    }
    for (let index = 0; index <= HighScores.length - 1; index++) {
        game.splash("" + HighScoreNames[index] + " --- " + HighScores[index])
    }
    setDifficulty()
    info.setLife(3)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    currentFood += -1
    HeroSprite.sayText(collected)
    if (EnemyVelocity <= MaxEnemyVelocity) {
        EnemyVelocity += 1
    }
})
let MaxEnemyVelocity = 0
let MaxFood = 0
let EnemyVelocity = 0
let RandomSprite: Sprite = null
let HighScoreNames: string[] = []
let HighScores: number[] = []
let difficulty = 0
let currentFood = 0
let collected = 0
let HeroSprite: Sprite = null
HeroSprite = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(HeroSprite)
HeroSprite.setPosition(randint(10, 160), randint(10, 120))
collected = 0
currentFood = 0
difficulty = 3
while (difficulty > 2) {
    difficulty = game.askForNumber("Choose Difficulty, 0-2. Other Numbers invalid.", 1)
}
setDifficulty()
HeroSprite.sayText(difficulty)
let NumberofHighScores = 3
HighScores = [0, 0, 0]
HighScoreNames = ["a", "b", "c"]
info.setLife(3)
game.onUpdateInterval(1, function () {
    if (currentFood < MaxFood) {
        SpawnFood()
    }
})
