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
    HeroSprite.sayText(EnemyVelocity)
    RandomSprite.setPosition(randint(0, 140), randint(0, 100))
    RandomSprite.setVelocity(EnemyVelocity, EnemyVelocity)
    RandomSprite.setStayInScreen(true)
    RandomSprite.setBounceOnWall(true)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    currentFood += -1
    HeroSprite.sayText(EnemyVelocity)
    if (EnemyVelocity <= MaxEnemyVelocity) {
        EnemyVelocity += 1
    }
})
let RandomSprite: Sprite = null
let MaxEnemyVelocity = 0
let EnemyVelocity = 0
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
let collected = 0
EnemyVelocity = 50
let currentFood = 0
MaxEnemyVelocity = 65
let MaxFood = 3
game.onUpdateInterval(1, function () {
    if (currentFood < MaxFood) {
        SpawnFood()
    }
})
