package com.zosh.modal;



import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.Email;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreContact {

    private String address;

    private String phone;

    @Email(message = "Invalid email format")
    private String email;
}
