import java.util.Random;
import java.util.concurrent.TimeUnit;

/**
 * Sensor Simulation: Produces continuous voltage values
 */
public class WeatherSensor {
    public static void main(String[] args) {
        Random random = new Random();
        System.out.println("--- Weather Station: Sensor Component Started: ");

        // Runs continuously with a message if failed
        while (true) {
            try {
                // Generate a voltage value between 0.0 and 5.0
                double voltage = 5.0 * random.nextDouble();
                System.out.printf("[SENSOR] Current Output: %.2fV%n", voltage);

                // Produces a value every 1 second to have a consistent value time
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                System.out.println("[SENSOR] Simulation interrupted.");
                break;
            }
        }
    }
}