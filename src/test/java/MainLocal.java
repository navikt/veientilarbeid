import no.nav.apiapp.ApiApp;
import no.nav.sbl.veientilarbeid.config.ApplicationConfig;

public class MainLocal {

    public static void main(String... args) throws Exception {
        System.setProperty("appres.cms.url","http://localhost:8080");

        ApiApp.startApp(ApplicationConfig.class, args);
    }
}