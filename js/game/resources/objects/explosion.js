var oExplosion = new GameObject("oExplosion");
var o = oExplosion;

o.onInit = function() {
    let o = this;

    o.coll = o.addModule(ModuleType.boxCollider);
    o.coll.bounds = new Rect(-64, -64, 128, 128);

    o.partDestroy = o.addModule(ModuleType.particleEmitter);
    o.partDestroy.setAlpha(0.05, 0.15, 0);
    o.partDestroy.setColor("orange");
    o.partDestroy.setLifeTime(200, 200);
    o.partDestroy.setDirection(0, 360);
    o.partDestroy.setSpeed(3, 5);
    o.partDestroy.setAccel(-0.1, -0.1);
    o.partDestroy.setScale(2, 2, 2, 2, -0.04);
    o.partDestroy.setRegion(0, 0, 0, 0);
    o.partDestroy.setAlpha(0.7, 1, -0.01);
    o.partDestroy.setLayer(4);

    o.sparks = o.addModule(ModuleType.particleEmitter);
    o.sparks.setColor("white");
    o.sparks.setLifeTime(100, 100);
    o.sparks.setDirection(0, 360);
    o.sparks.setSpeed(10, 12);
    o.sparks.setAccel(-0.3, -0.5);
    o.sparks.setScale(0.2, 0.3, 0.2, 0.3, -0.01);
    o.sparks.setRegion(0, 0, 0, 0);
    o.sparks.setAlpha(0.8, 0.9);
    o.sparks.setLayer(4);
    o.sparks.setSprite("square"); 

    o.partDestroy.burst(10);
    o.sparks.burst(20);
    playSound(explosionSnd);

    o.lifetime = 10;
}

o.onUpdate = function() {
    let o = this;
    o.lifetime--;

    if (o.lifetime <= 0) {
        o.coll.collisionAll(o.x, o.y, "oEnemy", function(other) {
            other.gameObject.hp -= 10;
        });
        o.destroy();
       // Engine.sleep(2);
    }
}