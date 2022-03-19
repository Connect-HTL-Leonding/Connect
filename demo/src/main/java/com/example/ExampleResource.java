package com.example;

import org.eclipse.microprofile.faulttolerance.CircuitBreaker;
import org.eclipse.microprofile.faulttolerance.Retry;
import org.eclipse.microprofile.faulttolerance.Timeout;
import org.eclipse.microprofile.metrics.MetricUnits;
import org.eclipse.microprofile.metrics.annotation.Counted;
import org.eclipse.microprofile.metrics.annotation.Timed;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Random;

@Path("/hello")
public class ExampleResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @Counted(description = "Count hello calls",
            displayName = "Hello counter", absolute = true)
    @Timed(name = "Hello time", unit= MetricUnits.MILLISECONDS, absolute = true)
    public String hello() {
        randomSleep();
        return "hello";
    }

    private void randomSleep() {
        try{
            Thread.sleep(new Random().nextInt(400));
        } catch (InterruptedException e){
            e.printStackTrace();
        }
    }


}