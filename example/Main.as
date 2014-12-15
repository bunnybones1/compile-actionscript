package {
	import flash.display.Sprite;
	import flash.display.Shape;
	public class Main extends Sprite {
		public function Main() {
			var circle:Shape = new Shape(); // The instance name circle is created
			circle.graphics.beginFill(0x990000, 1); // Fill the circle with the color 990000
			circle.graphics.lineStyle(2, 0x000000); // Give the ellipse a black, 2 pixels thick line
			circle.graphics.drawCircle((stage.stageWidth - 100) / 2, (stage.stageHeight - 100) / 2, 100); // Draw the circle, assigning it a x position, y position, raidius.
			circle.graphics.endFill(); // End the filling of the circle
			addChild(circle); // Add a child
		}
	}
}