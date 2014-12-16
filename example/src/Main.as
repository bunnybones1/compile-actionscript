package {
	import flash.display.Sprite;
	import flash.display.StageScaleMode;
	import flash.display.StageAlign;
	import flash.display.Shape;
	import flash.events.Event;
	import flash.text.TextField;
	import flash.text.TextFormat;
	import test.Test;
	import test2.Test2;
	public class Main extends Sprite {
		public var circle:Shape;
		public var textField:TextField;
		private static const verbage:String = STATUS::log;
		private static const testNumber:Number = STATUS::testNumber;
		private static const testBoolean:Boolean = STATUS::testBoolean;
		public function Main() {
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;
			circle = new Shape(); // The instance name circle is created
			addChild(circle); // Add a child
			circle.alpha = .2;
			redrawCircle();

        	var format:TextFormat = new TextFormat();
        	format.font = "courier";
			format.size = 15;
			textField = new TextField();
			textField.defaultTextFormat = format;
			textField.text = verbage + ' ' + testNumber;
			textField.width = stage.stageWidth;
			textField.height = stage.stageHeight;
            textField.multiline = true;
            textField.wordWrap = true;
			addChild(textField);
			stage.addEventListener(Event.RESIZE, resizeListener); 

			var test:Test = new Test();
			var test2:Test2 = new Test2();
		}

		public function redrawCircle():void {
			circle.graphics.clear();
			circle.graphics.beginFill(0x990000, 1); // Fill the circle with the color 990000
			circle.graphics.lineStyle(2, 0xff0000); // Give the ellipse a black, 2 pixels thick line
			circle.graphics.drawCircle(0, 0, (stage.stageWidth + stage.stageHeight) / 4); // Draw the circle, assigning it a x position, y position, raidius.
			circle.graphics.endFill(); // End the filling of the circle
			circle.x = (stage.stageWidth) / 2;
			circle.y = (stage.stageHeight) / 2;

		}

		public function resizeListener(e:Event):void {
			redrawCircle();
			textField.width = stage.stageWidth;
			textField.height = stage.stageHeight;
		}
	}
}