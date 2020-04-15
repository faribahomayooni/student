package com.NT2Student;
import android.content.Intent;
import  android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

import com.NT2Student.MainActivity;

public class SplashActivity  extends AppCompatActivity {
    @Override
    protected  void onCreate(Bundle saveInstanceState){

        super.onCreate(saveInstanceState);
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish();

    }
}
