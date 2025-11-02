public class MailList{
    public static void main(String[] args){
        
        String[] names = {"ganesh","guna","ushaswani","rohith","vadivelu","charith"};

        System.out.println("Before Sorting:");
        for(int i = 0; i < names.length-1; i++){
            System.out.println(names[i]);
        }
        
        // for(int i = 0; i < names.length-1; i++){
        //     for(int j = i + 1; j < names.length; j++){
        //         if(names[i].compareTo(names[j])>0){
        //             String temp = names[i];
        //             names[i] = names[j];
        //             names[j] = temp;
        //         }
        //     }
        // }

        // System.out.println("After Sorting:");
        // for(int i = 0; i < names.length; i++){
        //     System.out.println(names[i]);
        // }

        // String[] mailList = new String[names.length];
        // int count = 0;
        // for(String name : names){
        //     if(name.contains("i")){
        //         mailList[count++] = name;
        //     }
        // }

        // for(int i = 0; i < 2; i++){
        //     boolean alreadyPresent = false;
        //     for(int j = 0; j < count; j++){
        //         if(mailList[j].equals(names[i])){
        //             alreadyPresent = true;
        //             break;
        //         }
        //     }
        //     if(!alreadyPresent){
        //         mailList[count++] = names[i];
        //     }
        // }

        // System.out.println("Names to send mail: ");
        // for(int i = 0; i < count; i++){
        //     System.out.println(mailList[i]);
        // }

    }
}